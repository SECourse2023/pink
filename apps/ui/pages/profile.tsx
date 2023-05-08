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

function ProfileView() {
  const [profile, setProfile] = useState<any>({})
  const [authToken, setAuthToken] = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    http
      .get('/api/user/profile')
      .json()
      .then((data) => setProfile(data))
  })
  function logout() {
    setAuthToken('')
    localStorage.setItem('token', '')
    router.push('/')
  }
  return (
    <VStack>
      <Flex>
        <Avatar
          mx="10"
          my="10"
          size="2xl"
          name="Donald Trump"
          src={'https://cravatar.cn/avatar/' + md5(profile.email ?? '') + '?s=256&d=robohash&r=pg'}
        />
      </Flex>
      <Flex>
        <Heading as="h1" size="xl" mx="10" my="10">
          {profile.username}
        </Heading>
      </Flex>
      <Flex>
        <Button mx="10" my="10" colorScheme="red" variant="outline" onClick={logout}>
          退出登录
        </Button>
      </Flex>
    </VStack>
  )
}

export default ProfileView
