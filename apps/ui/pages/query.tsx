import React, { useEffect, useState, useContext } from 'react'
import {
  Box,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { AuthContext } from '../contexts/auth'
import { http } from '../utils/ky'
import type { Link } from '../components/types'

const QueryView: React.FC = () => {
  const [fromIdQuery, setFromIdQuery] = useState('')
  const [toIdQuery, setToIdQuery] = useState('')
  const [links, setLinks] = useState<Link[]>([])
  const [authToken] = useContext(AuthContext)

  const queryLink = async () => {
    if (authToken) {
      let query = {}
      if (fromIdQuery) query = { ...query, from: fromIdQuery }
      if (toIdQuery) query = { ...query, to: toIdQuery }

      if (fromIdQuery || toIdQuery) {
        const response = await http
          .post('/api/query/getLinkOf', {
            json: query
          })
          .json()
        if (Array.isArray(response)) {
          setLinks(response as Link[])
        }
      }
    }
  }

  return (
    <VStack spacing={4}>
      <Box margin={5}>
        <FormControl>
          <FormLabel>From ID</FormLabel>
          <Input type="text" value={fromIdQuery} onChange={(e) => setFromIdQuery(e.target.value)} />
          <FormLabel>To ID</FormLabel>
          <Input type="text" value={toIdQuery} onChange={(e) => setToIdQuery(e.target.value)} />
          <Button colorScheme="blue" onClick={queryLink} mt={3}>
            Query
          </Button>
        </FormControl>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Type</Th>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {links.map((link) => (
            <Tr key={link._id}>
              <Td>{link.from}</Td>
              <Td>{link.to}</Td>
              <Td>{link.type}</Td>
              <Td>{(link.metadata as { title: string }).title}</Td>
              <Td>{(link.metadata as { description: string }).description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  )
}

export default QueryView
