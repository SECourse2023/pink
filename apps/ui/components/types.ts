export interface Pin {
  _id: string
  type: string
  metadata: Record<string, unknown>
}

export interface Link {
  _id: string
  from: string
  to: string
  type: string
  metadata: Record<string, unknown>
}

export interface User {
  name: string
  avatar: string | null
  pins: Pin[] | null
  links: Link[] | null
}
