import React, { useState, useEffect } from 'react'
import { Box, Grid, Text, Flex, Heading } from '@chakra-ui/react'
import type { Link } from './types'
import { http } from '../utils/ky'
interface LinkListViewProps {
  links: Link[]
}
interface PinResponse {
  _id: string
  type: string
  owner: string
  metadata: {
    title: string
    description: string
    doid: string
    // Include other properties if needed
  }
}

const LinkListView: React.FC<LinkListViewProps> = ({ links }) => {
  const [titles, setTitles] = useState<{ [key: string]: string }>({})

  const fetchPinTitle = async (id: string) => {
    const response = await http.get(`/api/pin/${encodeURIComponent(id)}`).json<PinResponse>()
    if (response && response.metadata) {
      return response.metadata.title as string
    }
    return 'null' as string
  }

  useEffect(() => {
    const fetchTitles = async () => {
      const newTitles: { [key: string]: string } = {}
      for (const link of links) {
        newTitles[link.from] = await fetchPinTitle(link.from)
      }
      setTitles(newTitles)
    }
    fetchTitles()
  }, [links])

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
                From: {titles[link.from] || 'Loading title...'} ({link.from})
              </Text>
              <Text mb={2} fontSize="sm">
                To: {titles[link.to] || 'Loading title...'} ({link.to})
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
