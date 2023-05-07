import { Dispatch, SetStateAction, createContext } from 'react'

export const AuthContext = createContext(
  null as unknown as [string, Dispatch<SetStateAction<string>>]
)
