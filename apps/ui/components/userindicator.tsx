import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export default function UserIndicator() {
  const [authToken, setAuthToken] = useContext(AuthContext)

  if (authToken) {
    return (
      <Link as={NextLink} href="/profile">
        用户主页
      </Link>
    )
  } else {
    return (
      <Link as={NextLink} href="/login">
        登录
      </Link>
    )
  }
}
