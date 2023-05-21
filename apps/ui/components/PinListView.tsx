import React from 'react'
import { Box, VStack, Text, Flex, Grid, Heading } from '@chakra-ui/react'
import type { Pin } from './types'

interface PinListViewProps {
  pins: Pin[]
  handlePinClick: (pin: any) => void
}

const PinListView: React.FC<PinListViewProps> = ({ pins, handlePinClick }) => {
  if (pins.length === 0) {
    return (
      <Box py={5} px={10} overflowY="auto">
        <Flex direction="column" flexWrap="wrap" height="100%" width="100%">
          <Grid templateColumns="repeat(2,1fr))" gap="1">
            <Box borderWidth={1} borderRadius="lg" p={4} height="160px">
              <Heading as="h2" size="md" textAlign="center" py={5} color="#FF66FF">
                No pins found
              </Heading>
            </Box>
          </Grid>
        </Flex>
      </Box>
    )
  }

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
