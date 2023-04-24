import { nanoid } from 'nanoid/async'

export async function registerDOID(metadata: Record<string, unknown>) {
  return nanoid()
}
