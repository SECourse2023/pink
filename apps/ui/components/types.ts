export interface Pin {
  id: number
  title: string
  description: string
}

export interface Link {
  id: number
}

export interface User {
  id: number
  username: string
  email: string
  avatar: string | undefined
  pins: Pin[]
  links: Link[]
}
