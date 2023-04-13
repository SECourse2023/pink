import { database } from './base.js'

export interface IPin {
  _id: string
  type: string
  owner: string
  metadata: unknown
}

export const pinCollection = database.collection<IPin>('pins')
await pinCollection.createIndex({ doid: 1 }, { unique: true })
