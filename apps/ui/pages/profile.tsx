import { Flex, Avatar, Text, Wrap, WrapItem, Heading, Center, Spacer } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import PinListView from '../components/PinListView'
import pinsData from '../data/pinsData'

function ProfileView() {
  return (
    <VStack>
      <Flex>
        <Avatar
          mx="10"
          my="10"
          size="2xl"
          name="Donald Trump"
          src="https://images.unsplash.com/photo-1580128660010-fd027e1e587a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
        />
      </Flex>
      <Flex>
        <Heading as="h1" size="xl" mx="10" my="10">
          Donald Trump
        </Heading>
      </Flex>
      <HStack>
        <VStack>
          <Heading as="h2" size="md" mx="10" my="10">
            My Pins
          </Heading>
          <PinListView pins={pinsData} />
        </VStack>
        <VStack>
          <Heading as="h2" size="md" mx="10" my="10">
            My Links
          </Heading>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default ProfileView
