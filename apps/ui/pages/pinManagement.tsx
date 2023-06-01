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
  metadata: {
    title: string
    description: string
    uri: string
  }
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

  const onSubmit = async ({ type, metadata }: FormData) => {
    const response = await http.post('/api/pin/create', { json: { type, metadata } })
    if (!response) return
    refreshPinList()
    closeModal()
  }

  const onUpdatePin = async ({ type = selectedPin?.type, metadata }: FormData) => {
    const id = encodeURIComponent(selectedPin?._id ?? '')
    const response = await http.put('/api/pin/' + id, { json: { type, metadata } })
    if (!response) return
    refreshPinList()
    closeModal()
  }

  const onDeletePin = async () => {
    const id = encodeURIComponent(selectedPin?._id ?? '')
    const response = await http.delete('/api/pin/' + id)
    if (!response) return
    refreshPinList()
    closeModal()
  }

  const refreshPinList = async () => {
    if (authToken) {
      const response = await http.get(`/api/pin/list`).json()
      if (Array.isArray(response)) {
        setPins(response as Pin[])
      }
    }
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
    setDeleting(false)
    onOpen()
  }

  const openDeleteModal = () => {
    setDeleting(true)
    setUpdating(false)
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
                  </FormControl>
                  <FormControl>
                    <FormLabel>Pin Metadata Title</FormLabel>
                    <Input placeholder="Pin Metadata Title" {...register('metadata.title')} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Pin Metadata Description</FormLabel>
                    <Input
                      placeholder="Pin Metadata Description"
                      {...register('metadata.description')}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>URI</FormLabel>
                    <Input placeholder="Pin's URI" {...register('metadata.uri')} />
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
                <Text>
                  <b>URI</b>: {'' + selectedPin.metadata.uri}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  as={NextLink}
                  colorScheme="blue"
                  mr={3}
                  href={`/linkManagement/${encodeURIComponent(selectedPin._id)}`}
                >
                  Manage Links
                </Button>
                <Button colorScheme="green" mr={3} onClick={openUpdateModal}>
                  Update
                </Button>
                <Button colorScheme="red" mr={3} onClick={openDeleteModal}>
                  Delete
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
                    <FormLabel>Pin Type</FormLabel>
                    <Input
                      placeholder="Pin Type"
                      value={selectedPin.type}
                      isReadOnly
                      style={{ backgroundColor: '#F4F4F4', cursor: 'not-allowed' }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Pin Metadata Title</FormLabel>
                    <Input placeholder="Pin Metadata Title" {...register('metadata.title')} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Pin Metadata Description</FormLabel>
                    <Input
                      placeholder="Pin Metadata Description"
                      {...register('metadata.description')}
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
