import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import PinListView from '../components/PinListView'
import pinsData from '../data/pinsData'

const DashBoardView: React.FC = () => {
  return (
    <Flex>
      <Box width="2/7" backgroundColor="white">
        <Heading as="h1" size="lg" textAlign="center" py={5}>
          Pink
        </Heading>
        <PinListView pins={pinsData} />
      </Box>
      <Box width="5/7" backgroundColor="gray.100">
        {/* Right side content */}
      </Box>
    </Flex>
  )
}

export default DashBoardView
