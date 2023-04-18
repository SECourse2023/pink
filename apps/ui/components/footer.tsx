import { Flex, Spacer, Text, Stack } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Flex>
      <Spacer />
      <Stack spacing={3} align="center">
        <Text fontSize="sm" color="gray">
          这里应该写点什么东西
        </Text>
        <Text fontSize="sm" color="gray">
          2023 © Pink Team
        </Text>
      </Stack>
      <Spacer />
    </Flex>
  )
}
