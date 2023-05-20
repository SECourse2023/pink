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
import type { Link } from '../components/types'
import { http } from '../utils/ky'
import { AuthContext } from '../contexts/auth'

interface LinkListViewProps {
  links: Link[]
}

type FormData = {
  from: string,
  to: string,
  type: string,
  metadata_title: string,
  metadata_description: string
}

const LinkManagementView: React.FC<LinkListViewProps> = () => {
  const [selectedLink, setSelectedLink] = useState<Link | null>(null)
  const [viewing, setViewing] = useState(false)
  const [adding, setAdding] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [links, setLinks] = useState<any[]>([])
  const [authToken, setAuthToken] = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>()

  const onSubmit = async ({ from, to, type, metadata_title, metadata_description }: FormData) => {
    const metadata = { title: metadata_title, description: metadata_description }
    const response = await http
      .post('/api/link/create', { json: { from, to, type, metadata } })
      .json<{ token: string }>()
    if (!response) return
  }

  useEffect(() => {
    if (authToken) {
      http
        .get('/api/link/list')
        .json()
        .then((data) => setLinks(data as any))
    }
  }, [authToken])

  const openViewModal = (link: Link) => {
    setSelectedLink(link)
    setViewing(true)
    onOpen()
  }

  const openAddModal = () => {
    setAdding(true)
    onOpen()
  }

  const closeModal = () => {
    setSelectedLink(null)
    setViewing(false)
    setAdding(false)
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
                <Button colorScheme="red">Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          {adding && (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader>Add Link</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Link From</FormLabel>
                    <Input
                      placeholder="Link From"
                      {...register('from', {
                        required: 'Link From is required'
                      })}
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
                    <Input placeholder="Link Metadata Title" {...register('metadata_title')} />
                    <FormLabel>Link Metadata Description</FormLabel>
                    <Input
                      placeholder="Link Metadata Description"
                      {...register('metadata_description')}
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
                <Text mb={2}>
                  <strong>From:</strong> {selectedLink.from}
                </Text>
                <Text mb={2}>
                  <strong>To:</strong> {selectedLink.to}
                </Text>
                <Text mb={2}>
                  <strong>Type:</strong> {selectedLink.type}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {'Title: ' + selectedLink.metadata.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {'Description: ' + selectedLink.metadata.description}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Edit
                </Button>
                <Button onClick={closeModal}>Close</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default LinkManagementView
