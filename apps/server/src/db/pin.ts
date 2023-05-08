import { database } from './base.js'

export interface IPin {
  /**
   * The Pin's ID
   * We'll use the DOID
   */
  _id: string

  /**
   * The Pin's type
   */
  type: string

  /**
   * The Pin's owner, for Access Control
   */
  owner: string

  /**
   * The Pin's metadata
   */
  metadata: Record<string, unknown>
}

export const pinCollection = database.collection<IPin>('pins')
