import React, { useEffect, useState, useContext } from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import PinListView from '../components/PinListView'
import { http } from '../utils/ky'
import { AuthContext } from '../contexts/auth'

const DashBoardView: React.FC = () => {
  const [pins, setPins] = useState<any[]>([])
  const [authToken, setAuthToken] = useContext(AuthContext)
  useEffect(() => {
    if(authToken) {
      http
        .get('/api/pin/list')
        .json()
        .then((data) => setPins(data as any))
    }
  }, [authToken])
  return (
    <Flex>
      <Box width="2/7" backgroundColor="white">
        <Heading as="h1" size="lg" textAlign="center" py={5}>
          Pink
        </Heading>
        <PinListView pins={pins} />
      </Box>
      <Box width="5/7" backgroundColor="gray.100">
        {/* Right side content */}
      </Box>
    </Flex>
  )
}

export default DashBoardView
