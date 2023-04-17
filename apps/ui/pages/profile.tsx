import { Flex, Avatar, Text, Wrap, WrapItem, Heading, Center, Spacer } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

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
        <Card>
          <CardHeader>
            <Text>My Pins</Text>
            <ul>
              <li>Pin 1</li>
              <li>Pin 2</li>
            </ul>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Text>My Links</Text>
            <ul>
              <li>Link 1</li>
              <li>Link 2</li>
            </ul>
          </CardHeader>
        </Card>
      </HStack>
    </VStack>
  )
}

export default ProfileView
