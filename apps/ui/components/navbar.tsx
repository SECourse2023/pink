import { Flex, Heading, Link, Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'

import UserIndicator from './userindicator'

export default function NavBar() {
  return (
    <Flex
      px={4}
      py={2}
      backgroundColor="#bdc3c7"
      alignItems="center"
      className="shadow-xl rounded m-2 mb-4 !p-4"
    >
      <div className="text-2xl">
        <Link as={NextLink} href="/">
          科研DO关系管理平台
        </Link>
      </div>
      <Spacer />
      <UserIndicator />
    </Flex>
  )
}
