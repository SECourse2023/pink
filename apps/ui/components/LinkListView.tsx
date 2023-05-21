import React from 'react'
import { Box, Grid, Text, Flex, Heading } from '@chakra-ui/react'
import type { Link } from './types'

interface LinkListViewProps {
  links: Link[]
}

const LinkListView: React.FC<LinkListViewProps> = ({ links }) => {
  if (links.length === 0) {
    return (
      <Box py={5} px={10} overflowY="auto">
        <Flex direction="column" flexWrap="wrap" height="100%" width="100%">
          <Grid templateColumns="repeat(2,1fr))" gap="1">
            <Box borderWidth={1} borderRadius="lg" p={4} height="160px">
              <Heading as="h2" size="md" textAlign="center" py={5} color="#FF66FF">
                No links found
              </Heading>
            </Box>
          </Grid>
        </Flex>
      </Box>
    )
  }

  return (
    <Box py={5} px={10} overflowY="auto">
      <Flex direction="column" flexWrap="wrap" height="100%" width="100%">
        <Grid templateColumns="repeat(2,1fr))" gap="1">
          {links.map((link) => (
            <Box key={link._id} borderWidth={1} borderRadius="lg" p={4} height="160px">
              <Text mb={2} fontSize="sm">
                From (ID): {link.from}
              </Text>
              <Text mb={2} fontSize="sm">
                To (ID): {link.to}
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                {link.metadata.title as string}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {link.metadata.description as string}
              </Text>
              <Text fontSize="xs" color="red.200">
                {link.type}
              </Text>
            </Box>
          ))}
        </Grid>
      </Flex>
    </Box>
  )
}

export default LinkListView
