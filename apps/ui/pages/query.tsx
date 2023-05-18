import React, { useState, useEffect } from 'react'
import { Flex, Box, Input, Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import { http } from '../utils/ky'

const QueryView: React.FC = () => {
  const [fromDoid, setFromDoid] = useState('')
  const [toDoid, setToDoid] = useState('')
  const [result, setResult] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [shouldSubmit, setShouldSubmit] = useState(false)
  const toast = useToast()

  const handleSubmit = () => {
    setShouldSubmit(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!shouldSubmit) {
        return
      }

      try {
        const data = await http.post('/api/query/getLinkOf', {
          json: {
            from: fromDoid,
            to: toDoid
          }
        }).json()
        setResult(data)
        toast({
          title: "Request successful.",
          description: "We've sent your request to the server.",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        setIsOpen(true)
      } catch (error) {
        console.error(error);
      }
      
      setShouldSubmit(false)
    }

    fetchData()
  }, [fromDoid, toDoid, shouldSubmit])

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
    >
      {<Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
    >
      <Box
        w="100%"
        maxWidth="500px"
        p="2rem"
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        borderRadius="8px"
        bg="white"
      >
        <Box as="form" w="100%">
          <Input
            mb="1rem"
            type="text"
            value={fromDoid}
            onChange={(e) => setFromDoid(e.target.value)}
            placeholder="From DOID"
            variant="outline"
          />
          <Input
            mb="1rem"
            type="text"
            value={toDoid}
            onChange={(e) => setToDoid(e.target.value)}
            placeholder="To DOID"
            variant="outline"
          />
          <Button
            onClick={handleSubmit}
            bg="#2196f3"
            color="white"
            fontWeight="bold"
            borderRadius="4px"
          >
            Submit
          </Button>
          {result && (
            <pre>{JSON.stringify(result, null, 2)}</pre>
          )}
        </Box>
      </Box>
    </Flex>}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {JSON.stringify(result)}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default QueryView
