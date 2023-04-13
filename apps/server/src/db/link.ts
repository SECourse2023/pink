import { database } from './base.js'

export interface ILink {
  _id: string
  from: string
  to: string
  type: string
  metadata: unknown
}

export const linkCollection = database.collection<ILink>('links')
