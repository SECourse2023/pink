import { Flex, Avatar, Text, Wrap, WrapItem, Heading, Center, Spacer } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import PinListView from '../components/PinListView'
import Donald from '../data/usersData'

function ProfileView() {
  return (
    <VStack>
      <Flex>
        <Avatar mx="10" my="10" size="2xl" src={Donald.avatar} />
      </Flex>
      <VStack>
        <Heading as="h1" size="xl" mx="10" my="10">
          {Donald.username}
        </Heading>
        <Heading as="h1" size="xs" mx="10" my="10">
          {Donald.email}
        </Heading>
      </VStack>
      <HStack>
        <VStack>
          <Heading as="h2" size="md" mx="10" my="10">
            My Pins
          </Heading>
          <PinListView pins={Donald.pins} />
        </VStack>
      </HStack>
    </VStack>
  )
}

export default ProfileView
