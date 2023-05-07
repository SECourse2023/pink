import { GATEWAY_URL } from '../config/index.js'

export async function registerDOID(metadata: Record<string, unknown>) {
  const resp = await fetch(`${GATEWAY_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metadata)
  })
  const data = await resp.json()
  return data as string
}
