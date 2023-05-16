import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { AuthContext } from '../contexts/auth'
import useLocalStorage from '../hooks/use-local-storage'

function App({ Component, pageProps }: AppProps) {
  const [authToken, setAuthToken] = useLocalStorage('token', '')

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
