import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  HStack
} from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import ky from 'ky'

type FormData = {
  username: string
  email: string
  password: string
}

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>()

  const router = useRouter()

  const onSubmit = async ({ username, email, password }: FormData) => {
    const response = await ky
      .post('/api/user/register', { json: { username, email, password } })
      .json<{ _id: string }>()
      .catch((err) => {
        if (err.name === 'HTTPError') {
          console.log(err)
        }
      })
    if (!response) return

    router.push('/login')
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
            <FormLabel>邮箱</FormLabel>
            <Input
              type="email"
              placeholder="输入邮箱"
              {...register('email', {
                required: 'This is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: '邮箱格式不正确'
                }
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
              注册
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  )
}
