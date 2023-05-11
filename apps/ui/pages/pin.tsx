import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import LinkListView from './linklist'

const PinDetailPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Heading as="h1" size="xl">
        Pin Detail
      </Heading>
      {id && <LinkListView pinId={id} />}
    </div>
  )
}

export default PinDetailPage
