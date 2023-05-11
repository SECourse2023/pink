import React, { useState, useEffect } from 'react'
import { Box, VStack, Text, Button } from '@chakra-ui/react'

interface Pin {
  id: number
  type: string
  metadata: string
}

const PinListView: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([])

  useEffect(() => {
    loadPins()
  }, [])

  const loadPins = async () => {
    // 模拟从服务器加载数据
    const fetchedPins: Pin[] = [
      { id: 1, type: 'Type1', metadata: 'Metadata1' },
      { id: 2, type: 'Type2', metadata: 'Metadata2' }
    ]

    setPins(fetchedPins)
  }

  const createPin = () => {
    // 在此处实现创建pin的逻辑，例如跳转到一个新的页面，打开一个模态框等。
    console.log('Create pin button clicked')
  }

  return (
    <Box maxW="md" mx="auto" mt={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <VStack p="6">
        <Text fontSize="2xl" fontWeight="bold">
          Pin List
        </Text>
        {pins.map((pin) => (
          <Box
            key={pin.id}
            w="100%"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
          >
            <Text>Type: {pin.type}</Text>
            <Text>Metadata: {pin.metadata}</Text>
          </Box>
        ))}
        <Button colorScheme="blue" onClick={createPin}>
          Create Pin
        </Button>
      </VStack>
    </Box>
  )
}

export default PinListView
