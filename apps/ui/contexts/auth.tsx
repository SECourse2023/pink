import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null as unknown as [string, (token: string) => void])

function useLocalStorage(key: string, defaultValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initValue = localStorage.getItem(key) ?? defaultValue
      setValue(initValue)
    }
  }, [defaultValue, key])

  useEffect(() => {
    if (value !== defaultValue) {
      localStorage.setItem(key, value)
    }
  }, [key, value, defaultValue])

  return [value, setValue]
}

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [authToken, setAuthToken] = useLocalStorage('token', '')

  return <AuthContext.Provider value={[authToken, setAuthToken]}>{children}</AuthContext.Provider>
}
