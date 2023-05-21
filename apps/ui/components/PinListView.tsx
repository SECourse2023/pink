import React from 'react'
import { Box, VStack, Text } from '@chakra-ui/react'
import type { Pin } from './types'

interface PinListViewProps {
  pins: Pin[]
  handlePinClick: (pin: any) => void
}

const PinListView: React.FC<PinListViewProps> = ({ pins, handlePinClick }) => {
  return (
    <Box py={5} px={10}>
      <VStack spacing={5} align="left">
        {pins.map((pin) => (
          <Box
            key={pin._id}
            borderWidth={1}
            borderRadius="lg"
            p={4}
            cursor="pointer"
            onClick={() => handlePinClick(pin)}
          >
            <Text fontSize="sm" fontWeight="bold">
              {'' + pin.metadata.title}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {'' + pin.metadata.description}
            </Text>
            <Text fontSize="xs" color="red.200">
              {pin.type}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default PinListView
