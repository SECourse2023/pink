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
import type { Pin } from '../components/types'
import { http } from '../utils/ky'
import { AuthContext } from '../contexts/auth'
import NextLink from 'next/link'

interface PinListViewProps {
  pins: Pin[]
}

type FormData = {
  type: string | undefined
  metadata_title: string
  metadata_description: string
}

const PinManagementView: React.FC<PinListViewProps> = () => {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null)
  const [viewing, setViewing] = useState(false)
  const [adding, setAdding] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pins, setPins] = useState<any[]>([])
  const [authToken, setAuthToken] = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>()

  const onSubmit = async ({ type, metadata_title, metadata_description }: FormData) => {
    const metadata = { title: metadata_title, description: metadata_description }
    const response = await http.post('/api/pin/create', { json: { type, metadata } })
    if (!response) return
    window.location.reload()
  }

  const onUpdatePin = async ({
    type = selectedPin?.type,
    metadata_title,
    metadata_description
  }: FormData) => {
    const id = encodeURIComponent(selectedPin?._id ?? '')
    const metadata = { title: metadata_title, description: metadata_description }
    const response = await http.put('/api/pin/' + id, { json: { type, metadata } })
    if (!response) return
    window.location.reload()
  }

  const onDeletePin = async () => {
    const id = encodeURIComponent(selectedPin?._id ?? '')
    const response = await http.delete('/api/pin/' + id)
    if (!response) return
    window.location.reload()
  }

  useEffect(() => {
    if (authToken) {
      http
        .get('/api/pin/list')
        .json()
        .then((data) => setPins(data as any))
    }
  }, [authToken])

  const openViewModal = (pin: Pin) => {
    setSelectedPin(pin)
    setViewing(true)
    onOpen()
  }

  const openAddModal = () => {
    setAdding(true)
    onOpen()
  }

  const openUpdateModal = () => {
    setUpdating(true)
    onOpen()
  }

  const openDeleteModal = () => {
    setDeleting(true)
    onOpen()
  }

  const closeModal = () => {
    setSelectedPin(null)
    setViewing(false)
    setAdding(false)
    setUpdating(false)
    setDeleting(false)
    onClose()
  }

  return (
    <VStack spacing={4}>
      <Box margin={5}>
        <Button colorScheme="pink" onClick={openAddModal} size="lg">
          Add Pin
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pins.map((pin) => (
            <Tr key={pin._id}>
              <Td>{'' + pin.metadata.title}</Td>
              <Td>{'' + pin.type}</Td>
              <Td>{'' + pin.metadata.description}</Td>
              <Td>
                <Button colorScheme="blue" mr={3} onClick={() => openViewModal(pin)}>
                  View
                </Button>
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
                <ModalHeader>Add Pin</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Pin Type</FormLabel>
                    <Input
                      placeholder="Pin Type"
                      {...register('type', {
                        required: 'Pin Type is required'
                      })}
                    />
                    <FormLabel>Pin Metadata Title</FormLabel>
                    <Input placeholder="Pin Metadata Title" {...register('metadata_title')} />
                    <FormLabel>Pin Metadata Description</FormLabel>
                    <Input
                      placeholder="Pin Metadata Description"
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
          {viewing && selectedPin && (
            <>
              <ModalHeader>Pin Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  <b>ID</b>: {'' + selectedPin._id}
                </Text>
                <Text>
                  <b>Type</b>: {'' + selectedPin.type}
                </Text>
                <Text>
                  <b>Title</b>: {'' + selectedPin.metadata.title}
                </Text>
                <Text>
                  <b>Description</b>: {'' + selectedPin.metadata.description}
                </Text>
              </ModalBody>
              <ModalFooter>
                <NextLink href={`/linkManagement/${encodeURIComponent(selectedPin._id)}`} passHref>
                  <Button as="a" colorScheme="blue" mr={3}>
                    Manage Links
                  </Button>
                </NextLink>
                <Button colorScheme="red" mr={3} onClick={openDeleteModal}>
                  Delete
                </Button>
                <Button colorScheme="green" mr={3} onClick={openUpdateModal}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
          {updating && selectedPin && (
            <>
              <form onSubmit={handleSubmit(onUpdatePin)}>
                <ModalHeader>Update Pin</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Pin Type: {'' + selectedPin.type}</FormLabel>
                    <FormLabel>Pin Metadata Title</FormLabel>
                    <Input placeholder="Pin Metadata Title" {...register('metadata_title')} />
                    <FormLabel>Pin Metadata Description</FormLabel>
                    <Input
                      placeholder="Pin Metadata Description"
                      {...register('metadata_description')}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="green" mr={3} type="submit">
                    Update
                  </Button>
                  <Button onClick={closeModal}>Cancel</Button>
                </ModalFooter>
              </form>
            </>
          )}
          {deleting && selectedPin && (
            <>
              <form onSubmit={handleSubmit(onDeletePin)}>
                <ModalHeader>Delete Pin</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Are you sure you want to delete the pin with ID <b>{'' + selectedPin._id}</b>?
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} type="submit">
                    Delete
                  </Button>
                  <Button onClick={closeModal}>Cancel</Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default PinManagementView
