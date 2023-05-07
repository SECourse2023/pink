import { Flex, Heading, Link, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'

import UserIndicator from './userindicator'

export default function NavBar() {
  return (
    <Flex px={4} py={2} backgroundColor="pink" alignItems="center">
      <Heading>
        <Link as={NextLink} href="/">
          科研DO关系管理平台
        </Link>
      </Heading>
      <Spacer />
      <UserIndicator />
    </Flex>
  )
}
