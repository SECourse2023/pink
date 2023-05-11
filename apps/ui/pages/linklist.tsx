import { useState, useEffect } from 'react'
import { Box, Heading, UnorderedList, ListItem, Link } from '@chakra-ui/react'
import ky from 'ky'

type LinkType = {
  title: string
  url: string
}

const LinkListView = ({ pinId }: { pinId: string }) => {
  const [links, setLinks] = useState<LinkType[]>([])

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await ky.get(`/api/pin/${pinId}/links`).json()
      setLinks(response.data)
    }

    fetchLinks()
  }, [])

  return (
    <Box>
      <Heading as="h2" size="lg">
        Links
      </Heading>
      <UnorderedList mt={4}>
        {links.map((link, index) => (
          <ListItem key={`link-${index}`}>
            <Link href={link.url} isExternal>
              {link.title}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default LinkListView
