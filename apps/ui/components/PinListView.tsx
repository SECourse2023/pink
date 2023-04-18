import React from 'react'
import { Box, VStack, Text } from '@chakra-ui/react'
import type { Pin } from './types'

interface PinListViewProps {
  pins: Pin[]
}

const PinListView: React.FC<PinListViewProps> = ({ pins }) => {
  return (
    <Box py={5} px={10}>
      <VStack spacing={5} align="left">
        {pins.map((pin) => (
          <Box key={pin.id} borderWidth={1} borderRadius="lg" p={4}>
            <Text fontSize="sm" fontWeight="bold">
              {pin.title}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {pin.description}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default PinListView
