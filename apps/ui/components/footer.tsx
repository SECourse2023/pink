import { Flex, Spacer, Text, Stack } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Flex>
      <Spacer />
      <Stack spacing={3} align="center">
        <Text fontSize="sm" color="gray">
          软工实验班2023春季学期 - 第一组课程项目
        </Text>
        <Text fontSize="sm" color="gray">
          2023 © SECourse2023
        </Text>
      </Stack>
      <Spacer />
    </Flex>
  )
}
