import { Link, Spacer, HStack } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export default function UserIndicator() {
  const [authToken, setAuthToken] = useContext(AuthContext)

  return (
    <HStack>
      <Link href="/stats">数据统计</Link>
      <Spacer />
      <Link as={NextLink} href={authToken ? `/profile` : `/login`}>
        {authToken ? '用户主页' : '登录'}
      </Link>
    </HStack>
  )
}
