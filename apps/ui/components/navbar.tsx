import { Flex, Heading, Spacer, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function NavBar() {
  return (
    <Flex px={4} py={2} backgroundColor="pink" alignItems="center">
      <Heading>Pink</Heading>
      <Spacer />
      <Link as={NextLink} href="/login">
        登录
      </Link>
    </Flex>
  )
}
