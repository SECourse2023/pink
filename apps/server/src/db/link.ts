import { database } from './base.js'

/**
 * The Link Interface
 *
 * @export
 * @interface ILink
 */
export interface ILink {
  /**
   * A unique identifier for the link
   * Generated using nanoid
   */
  _id: string

  /**
   * The link's from side's Pin's ID
   */
  from: string

  /**
   * The link's to side's Pin's ID
   */
  to: string

  /**
   * The link's type
   */
  type: string

  /**
   * The link's metadata
   */
  metadata: Record<string, unknown>
}

export const linkCollection = database.collection<ILink>('links')
