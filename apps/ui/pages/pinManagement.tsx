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

interface PinListViewProps {
  pins: Pin[]
}

type FormData = {
  type: string
  metadata_title: string
  metadata_description: string
}

const PinManagementView: React.FC<PinListViewProps> = () => {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null)
  const [viewing, setViewing] = useState(false)
  const [adding, setAdding] = useState(false)
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
    const response = await http
      .post('/api/pin/create', { json: { type, metadata } })
      .json<{ token: string }>()
    if (!response) return
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

  const closeModal = () => {
    setSelectedPin(null)
    setViewing(false)
    setAdding(false)
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
            <Th>Description</Th>
            <Th>Type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pins.map((pin) => (
            <Tr key={pin._id}>
              <Td>{'' + pin.metadata.title}</Td>
              <Td>{'' + pin.metadata.description}</Td>
              <Td>{'' + pin.type}</Td>
              <Td>
                <Button colorScheme="blue" mr={3} onClick={() => openViewModal(pin)}>
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
                    <FormLabel>Pin Metadata Title</FormLabel>
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
                <Text mb={2}>
                  <strong>Type:</strong> {selectedPin.type}
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  {'Title: ' + selectedPin.metadata.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {'Description: ' + selectedPin.metadata.description}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Manage Links
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

export default PinManagementView
