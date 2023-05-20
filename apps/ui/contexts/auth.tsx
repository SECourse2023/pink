import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null as unknown as [string, (token: string) => void])

function useLocalStorage(key: string, defaultValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) ?? defaultValue
    }
    return defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [authToken, setAuthToken] = useLocalStorage('token', '')

  return <AuthContext.Provider value={[authToken, setAuthToken]}>{children}</AuthContext.Provider>
}
