import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import type { Link } from '../../components/types'
import { http } from '../../utils/ky'
import { AuthContext } from '../../contexts/auth'
import { useRouter } from 'next/router'

interface LinkListViewProps {
  fromurl: string
}
interface PinResponse {
  _id: string
  type: string
  owner: string
  metadata: {
    title: string
    description: string
    uri: string
    // Include other properties if needed
  }
}

type FormData = {
  from: string
  to: string
  type: string
  metadata: {
    title: string
    description: string
  }
}

const LinkManagementView: React.FC<LinkListViewProps> = ({ fromurl }) => {
  const fromid = decodeURIComponent(fromurl as string)
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)
  const [viewing, setViewing] = useState(false)
  const [adding, setAdding] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [links, setLinks] = useState<any[]>([])
  const [authToken, setAuthToken] = useContext(AuthContext)
  const [editing, setEditing] = useState(false)
  const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null)
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal
  } = useDisclosure()
  const [fromTitle, setFromTitle] = useState<string | null>(null)
  const [toTitle, setToTitle] = useState<string | null>(null)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>()

  const onSubmitAdd = async ({ to, type, metadata }: FormData) => {
    const response = await http
      .post('/api/link/create', { json: { from: fromid, to, type, metadata } })
      .json<{ token: string }>()
    if (!response) return
    // Refresh the link list
    refreshLinkList()
    closeModal()
  }

  const onSubmitEdit = async ({ to, type, metadata }: FormData) => {
    if (!selectedLink) return
    const response = await http
      .put(`/api/link/${encodeURIComponent(selectedLink._id)}`, { json: { type, metadata } })
      .json<{ token: string }>()
    setLinks([])
    refreshLinkList()
    closeModal()
    if (!response) return
    // Clear the link list and refresh
  }

  const refreshLinkList = async () => {
    if (authToken && fromid) {
      const response = await http.get(`/api/link/list?from=${fromid}`).json()
      if (Array.isArray(response)) {
        setLinks(response as Link[])
      }
    }
  }

  useEffect(() => {
    if (authToken && fromid) {
      http
        .get(`/api/link/list?from=${fromid}`)
        .json()
        .then((data) => setLinks(data as any))
    }
  }, [authToken, fromid, links.length])

  const fetchPinTitle = async (id: string) => {
    const response = await http.get(`/api/pin/${encodeURIComponent(id)}`).json<PinResponse>()
    if (response && response.metadata) {
      return response.metadata.title
    }
    return null
  }

  useEffect(() => {
    if (selectedLink) {
      Promise.all([fetchPinTitle(selectedLink.from), fetchPinTitle(selectedLink.to)]).then(
        ([fromTitle, toTitle]) => {
          setFromTitle(fromTitle)
          setToTitle(toTitle)
        }
      )
    }
  }, [selectedLink])

  const openViewModal = (link: Link) => {
    setSelectedLink(link)
    setViewing(true)
    onOpen()
  }

  const openAddModal = () => {
    setAdding(true)
    onOpen()
  }

  const deleteLink = (linkId: string) => {
    setDeletingLinkId(linkId)
    onOpenDeleteModal() // 使用新的打开函数
  }

  const confirmDelete = async () => {
    if (!deletingLinkId) return

    const response = await http.delete(`/api/link/${encodeURIComponent(deletingLinkId)}`).json()
    if (response) {
      refreshLinkList()
      onCloseDeleteModal() // 使用新的关闭函数
    }
  }

  const closeModal = () => {
    setSelectedLink(null)
    setViewing(false)
    setAdding(false)
    setEditing(false)
    onClose()
  }

  return (
    <VStack spacing={4}>
      <Box margin={5}>
        <Button colorScheme="pink" onClick={openAddModal} size="lg">
          Add Link
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Type</Th>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {links.map((link) => (
            <Tr key={link._id}>
              <Td>{link.from}</Td>
              <Td>{link.to}</Td>
              <Td>{'' + link.type}</Td>
              <Td>{'' + link.metadata.title}</Td>
              <Td>{'' + link.metadata.description}</Td>
              <Td>
                <Button colorScheme="blue" mr={3} onClick={() => openViewModal(link)}>
                  View
                </Button>
                <Button colorScheme="red" onClick={() => deleteLink(link._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent maxH="150vh" overflowY="auto">
          {adding && (
            <>
              <form onSubmit={handleSubmit(onSubmitAdd)}>
                <ModalHeader>Add Link</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Link From</FormLabel>
                    <Input
                      type="text"
                      value={fromid}
                      isReadOnly
                      style={{ backgroundColor: '#F4F4F4', cursor: 'not-allowed' }}
                    />
                    <FormLabel>Link To</FormLabel>
                    <Input
                      placeholder="Link To"
                      {...register('to', {
                        required: 'Link To is required'
                      })}
                    />
                    <FormLabel>Link Type</FormLabel>
                    <Input
                      placeholder="Link Type"
                      {...register('type', {
                        required: 'Link Type is required'
                      })}
                    />
                    <FormLabel>Link Metadata Title</FormLabel>
                    <Input placeholder="Link Metadata Title" {...register('metadata.title')} />
                    <FormLabel>Link Metadata Description</FormLabel>
                    <Input
                      placeholder="Link Metadata Description"
                      {...register('metadata.description')}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="green" mr={3} type="submit">
                    Add
                  </Button>
                  <Button onClick={closeModal}>Cancel</Button>
                </ModalFooter>
              </form>
            </>
          )}
          {viewing && selectedLink && (
            <>
              <ModalHeader>Link Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  <b>From Title</b>: {'' + fromTitle}
                </Text>
                <Text>
                  <b>From ID</b>: {'' + selectedLink.from}
                </Text>
                <Text>
                  <b>To Title</b>: {'' + toTitle}
                </Text>
                <Text>
                  <b>To ID</b>: {'' + selectedLink.to}
                </Text>
                <Text>
                  <b>Link ID</b>: {'' + selectedLink._id}
                </Text>
                <Text>
                  <b>Link Type</b>: {'' + selectedLink.type}
                </Text>
                <Text>
                  <b>Link Title</b>: {'' + selectedLink.metadata.title}
                </Text>
                <Text>
                  <b>Link Description</b>: {'' + selectedLink.metadata.description}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => setEditing(true)}>
                  Edit
                </Button>
                <Button onClick={closeModal}>Close</Button>
              </ModalFooter>
            </>
          )}
          {editing && selectedLink && (
            <>
              <form onSubmit={handleSubmit(onSubmitEdit)}>
                <ModalHeader>Edit Link</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Link From</FormLabel>
                    <Input
                      type="text"
                      value={fromid}
                      isReadOnly
                      style={{ backgroundColor: '#F4F4F4', cursor: 'not-allowed' }}
                    />
                    <FormLabel>Link To</FormLabel>
                    <Input
                      type="text"
                      value={selectedLink.to}
                      isReadOnly
                      style={{ backgroundColor: '#F4F4F4', cursor: 'not-allowed' }}
                    />

                    <FormLabel>Link Type</FormLabel>
                    <Input
                      placeholder="Link Type"
                      value={selectedLink.type}
                      isReadOnly
                      style={{ backgroundColor: '#F4F4F4', cursor: 'not-allowed' }}
                    />
                    <FormLabel>Link Metadata Title</FormLabel>
                    <Input
                      placeholder="Link Metadata Title"
                      defaultValue={selectedLink.metadata.title as string}
                      {...register('metadata.title')}
                    />
                    <FormLabel>Link Metadata Description</FormLabel>
                    <Input
                      placeholder="Link Metadata Description"
                      defaultValue={selectedLink.metadata.description as string}
                      {...register('metadata.description')}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="green" mr={3} type="submit" isLoading={isSubmitting}>
                    Save
                  </Button>
                  <Button onClick={closeModal}>Cancel</Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete with ID <b>{('' + deletingLinkId) as string}</b>?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => confirmDelete()}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default LinkManagementView
