import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  VStack,
  StackDivider,
  HStack,
  Spacer
} from '@chakra-ui/react'
import NextLink from 'next/link'
import PinListView from '../components/PinListView'
import LinkListView from '../components/LinkListView'
import { http } from '../utils/ky'
import { AuthContext } from '../contexts/auth'
import StatsView from './statsView'

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
    <Flex width="full" direction="column">
      <Flex mx={20}>
        <StatsView />
      </Flex>
      <Flex mx={20} gap={6}>
        <Box flex="0.3" backgroundColor="white" boxShadow="md" borderRadius="md" p="4">
          <Heading as="h1" size="lg" textAlign="center" py={5}>
            Pins
          </Heading>
          <PinListView pins={pins} handlePinClick={handlePinClick} />
          <HStack justifyContent="center" divider={<StackDivider borderColor="gray.200" />} mb={5}>
            <Link href={authToken ? `/pinManagement` : `/login`}>
              <Button colorScheme="blue" variant="solid">
                Manage Pins
              </Button>
            </Link>
            <Link href={authToken ? `/query` : `/login`}>
              <Button colorScheme="green" variant="solid">
                Query Links
              </Button>
            </Link>
          </HStack>
        </Box>
        {selectedPin && (
          <Box flex="0.7" backgroundColor="white" boxShadow="md" borderRadius="md" p="4">
            <Heading as="h1" size="lg" textAlign="center" py={5}>
              Links
            </Heading>
            <LinkListView links={links} />
            <Flex justifyContent="center" mb={5}>
              <Link href={`/linkManagement/${encodeURIComponent(selectedPin._id)}`}>
                <Button colorScheme="blue" variant="solid">
                  Manage Links
                </Button>
              </Link>
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  )
}

export default DashBoardView
