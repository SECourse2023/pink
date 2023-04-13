import { database } from './base.js'

export interface IUser {
  _id: string
  username: string
  email: string
  hash: string
}

export const userCollection = database.collection<IUser>('users')
await userCollection.createIndex({ username: 1 }, { unique: true })
