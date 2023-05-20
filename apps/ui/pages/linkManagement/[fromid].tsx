// pages/linkManagement/[fromid].tsx
import { useRouter } from 'next/router'
import LinkManagementView from '../../components/linkManagement'

export default function PinIdPage() {
  const router = useRouter()
  const { fromid } = router.query

  return <LinkManagementView fromurl={fromid as string} />
}
