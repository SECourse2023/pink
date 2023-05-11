import React, { useState } from 'react'
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

interface Pin {
  id: number
  type: string
  metadata: string
}

const pinData: Pin[] = [
  { id: 1, type: 'Type1', metadata: 'Metadata1' },
  { id: 2, type: 'Type2', metadata: 'Metadata2' }
  //... 更多的Pin数据
]

const PinListView: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null)
  const [viewing, setViewing] = useState(false)
  const [adding, setAdding] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Box>
        <Button colorScheme="pink" onClick={openAddModal}>
          Add Pin
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Metadata</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pinData.map((pin) => (
            <Tr key={pin.id}>
              <Td>{pin.type}</Td>
              <Td>{pin.metadata}</Td>
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
              <ModalHeader>Add Pin</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Pin Type</FormLabel>
                  <Input placeholder="Pin Type" />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Pin Metadata</FormLabel>
                  <Input placeholder="Pin Metadata" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="green" mr={3}>
                  Add
                </Button>
                <Button onClick={closeModal}>Cancel</Button>
              </ModalFooter>
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
                <Text>
                  <strong>Metadata:</strong> {selectedPin.metadata}
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

export default PinListView
