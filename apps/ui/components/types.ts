export interface Pin {
  id: number
  title: string
  description: string
}

export interface Link {
  id: number
}

export interface User {
  name: string
  avatar: string | null
  pins: Pin[] | null
  links: Link[] | null
}
