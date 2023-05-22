import {
  Flex,
  Avatar,
  Text,
  Wrap,
  WrapItem,
  Heading,
  Center,
  Spacer,
  Button
} from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { http } from '../utils/ky'
import md5 from 'md5'
import { useRouter } from 'next/router'
import { AuthContext } from '../contexts/auth'

function StatsView() {
  const [stats, setStats] = useState<any>({})

  useEffect(() => {
    http
      .get('/api/query/stats')
      .json()
      .then((data) => setStats(data))
  }, [])
  return (
    <VStack>
      <Heading as="h1" size="xl" mx="10" my="10">
        pin数量{stats.pins}
      </Heading>
      <Heading as="h1" size="xl" mx="10" my="10">
        links数量{stats.links}
      </Heading>
      <Heading as="h1" size="xl" mx="10" my="10">
        user数量{stats.users}
      </Heading>
    </VStack>
  )
}

export default StatsView
