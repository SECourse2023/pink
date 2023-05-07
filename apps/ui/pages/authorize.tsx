import { Flex, Avatar, Heading, Button } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { http } from '../utils/ky'
import md5 from 'md5'
import { useRouter } from 'next/router'
import { AuthContext } from '../contexts/auth'

function ProfileView() {
  const router = useRouter()
  async function authorization() {
    // Implement OIDC implicit flow here
    // We will generate
    const { idToken, accessToken } = (await http
      .post('/api/user/authorize', {
        json: router.query
      })
      .json()) as any
    // redirect to the redirect_uri with the id_token and auth_token
    const redirect_uri = router.query.redirect_uri as string
    location.href = `${redirect_uri}#id_token=${idToken}&access_token=${accessToken}&state=${router.query.state}&token_type=bearer`
  }
  return (
    <VStack>
      <Flex>
        <Button mx="10" my="10" colorScheme="red" variant="outline" onClick={authorization}>
          授权登录
        </Button>
      </Flex>
    </VStack>
  )
}

export default ProfileView
