import { linkCollection } from './link.js'
import { pinCollection } from './pin.js'
import { userCollection } from './users.js'

export { client, database } from './base.js'
export const collections = {
  users: userCollection,
  pins: pinCollection,
  links: linkCollection
}
