import {
  Flex,
  Avatar,
  Text,
  Box,
  Wrap,
  WrapItem,
  Heading,
  StackDivider,
  Center,
  Spacer,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  HStack,
  VStack
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { http } from '../utils/ky'

function StatsView() {
  const [stats, setStats] = useState<any>({})

  useEffect(() => {
    http
      .get('/api/query/stats')
      .json()
      .then((data) => setStats(data))
  }, [])
  return (
    <Card>
      <CardHeader>
        <Heading as="h2" size="lg">
          总览
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading as="h3" size="md">
              Pin数量
            </Heading>
            <Text>{stats.pins}</Text>
          </Box>
          <Box>
            <Heading as="h3" size="md">
              Link数量
            </Heading>
            <Text>{stats.links}</Text>
          </Box>
          <Box>
            <Heading as="h3" size="md">
              用户数量
            </Heading>
            <Text>{stats.users}</Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default StatsView
