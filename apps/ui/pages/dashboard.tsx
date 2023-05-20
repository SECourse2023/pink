import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import PinListView from '../components/PinListView'
import { http } from '../utils/ky'
import { AuthContext } from '../contexts/auth'

const DashBoardView: React.FC = () => {
  const [pins, setPins] = useState<any[]>([])
  const [authToken, setAuthToken] = useContext(AuthContext)
  useEffect(() => {
    if (authToken) {
      http
        .get('/api/pin/list')
        .json()
        .then((data) => setPins(data as any))
    }
  }, [authToken])
  return (
    <Flex ml={20}>
      <Box width="2/7" backgroundColor="white" boxShadow="md">
        <Heading as="h1" size="lg" textAlign="center" py={5}>
          Pins
        </Heading>
        <PinListView pins={pins} />
        <Link href="/pinManagement">
          <Button colorScheme="blue">Manage Pins</Button>
        </Link>
      </Box>
      <Box width="5/7" backgroundColor="gray.100">
        {/* Right side content */}
      </Box>
    </Flex>
  )
}

export default DashBoardView
