import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  HStack
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/auth'
import { http } from '../utils/ky'

type FormData = {
  username: string
  password: string
}

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>()

  const router = useRouter()

  const [authToken, setAuthToken] = useContext(AuthContext)

  if (authToken) router.replace('/')

  const onSubmit = async ({ username, password }: FormData) => {
    const response = await http
      .post('/api/user/login', { json: { username, password } })
      .json<{ token: string }>()
      .catch((err) => {
        if (err.name === 'HTTPError' && err.response.status === 401) {
          setError('password', {
            type: 'manual',
            message: '用户名或密码错误'
          })
        }
      })
    if (!response) return

    setAuthToken(response.token)
    router.push('/')
  }

  return (
    <Box maxW="md" mx="auto" mt={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username !== undefined}>
            <FormLabel>用户名</FormLabel>
            <Input
              placeholder="输入用户名"
              {...register('username', {
                required: 'This is required'
              })}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={errors.password !== undefined}>
            <FormLabel>密码</FormLabel>
            <Input
              type="password"
              placeholder="输入密码"
              {...register('password', {
                required: 'This is required'
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <HStack w="full" spacing={4} mt={8}>
            <Button colorScheme="pink" isLoading={isSubmitting} type="submit">
              登录
            </Button>
            <Button colorScheme="pink" variant="outline" onClick={() => router.push('/register')}>
              注册
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  )
}
