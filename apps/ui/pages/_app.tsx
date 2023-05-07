import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { AuthContext } from '../contexts/auth'
import { useEffect, useState } from 'react'

function App({ Component, pageProps }: AppProps) {
  const [authToken, setAuthToken] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')
    setAuthToken(token ?? '')
    window.addEventListener('storage', storageChange)
    return () => {
      window.removeEventListener('storage', storageChange)
    }
  }, [])

  const storageChange = (storageEvent: StorageEvent) => {
    if (storageEvent.key === 'token') {
      const token = storageEvent.newValue
      setAuthToken(token ?? '')
    }
  }

  return (
    <AuthContext.Provider value={[authToken, setAuthToken]}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </AuthContext.Provider>
  )
}

export default App
