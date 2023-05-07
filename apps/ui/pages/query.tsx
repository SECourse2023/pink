import React, { useState } from 'react'
import { Flex, Box, Input, Button } from '@chakra-ui/react'

interface QueryViewProps {
  onSubmit: (fromDoid: string, toDoid: string) => void
}

const QueryView: React.FC<QueryViewProps> = ({ onSubmit }) => {
  const [fromDoid, setFromDoid] = useState('')
  const [toDoid, setToDoid] = useState('')

  const handleSubmit = () => {
    onSubmit(fromDoid, toDoid)
  }

  return (
    <Flex
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
        </Box>
      </Box>
    </Flex>
  )
}

export default QueryView
