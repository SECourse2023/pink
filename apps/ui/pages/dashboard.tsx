import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Flex, Heading, Link, VStack, StackDivider } from '@chakra-ui/react'
import NextLink from 'next/link'
import PinListView from '../components/PinListView'
import LinkListView from '../components/LinkListView'
import { http } from '../utils/ky'
import { AuthContext } from '../contexts/auth'

const DashBoardView: React.FC = () => {
  const [pins, setPins] = useState<any[]>([])
  const [selectedPin, setSelectedPin] = useState<any | null>(null)
  const [links, setLinks] = useState<any[]>([])
  const [authToken, setAuthToken] = useContext(AuthContext)
  useEffect(() => {
    if (authToken) {
      http
        .get('/api/pin/list')
        .json()
        .then((data) => setPins(data as any))
    }
  }, [authToken])
  const handlePinClick = (pin: any) => {
    setSelectedPin(pin)
    fetchLinks(pin) // 调用fetchLinks函数来获取links数据
  }

  const fetchLinks = (pin: any) => {
    http
      .get(`/api/link/list?from=${encodeURIComponent(pin._id)}`)
      .then((response) => response.json())
      .then((data) => setLinks(data as any))
      .catch((error) => console.log(error))
  }

  return (
    <Flex ml="20" width="90%">
      <Box flex="0.3" backgroundColor="white" boxShadow="md">
        <Heading as="h1" size="lg" textAlign="center" py={5}>
          Pins
        </Heading>
        <PinListView pins={pins} handlePinClick={handlePinClick} />
        <VStack justifyContent="center" divider={<StackDivider borderColor="white" />}>
          <Link href="/pinManagement">
            <Button colorScheme="blue">Manage Pins</Button>
          </Link>
          <Link href="/query">
            <Button colorScheme="green">Query Links</Button>
          </Link>
        </VStack>
      </Box>
      {selectedPin && (
        <Box flex="0.7" backgroundColor="white" boxShadow="md">
          <Heading as="h1" size="lg" textAlign="center" py={5}>
            Links
          </Heading>
          <LinkListView links={links} />
          <Flex justifyContent="center">
            <Link href={`/linkManagement/${encodeURIComponent(selectedPin._id)}`}>
              <Button colorScheme="blue">Manage Links</Button>
            </Link>
          </Flex>
        </Box>
      )}
      <Link href="/statsView">
        <Button colorScheme="blue">数据总量</Button>
      </Link>
    </Flex>
  )
}

export default DashBoardView
