import type { User } from '../components/types'
import pinsData from './pinsData'

const Donald: User = {
  id: 0,
  username: 'Donald Trump',
  email: 'donaldtrump@gmail.com',
  avatar:
    'https://images.unsplash.com/photo-1580128660010-fd027e1e587a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
  pins: pinsData,
  links: []
}

export default Donald
