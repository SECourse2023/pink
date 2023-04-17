import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
export default function Login() {
  const router = useRouter()
  const onLogin = () => {
    alert('登录成功')
    router.push('/')
  }

  return (
    <Box maxW="md" mx="auto" mt={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <FormControl>
          <FormLabel>用户名</FormLabel>
          <Input placeholder="输入用户名" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>密码</FormLabel>
          <Input type="password" placeholder="输入密码" />
        </FormControl>
        <Button colorScheme="pink" mt={8} onClick={onLogin} w="full">
          登录
        </Button>
      </Box>
    </Box>
  )
}
