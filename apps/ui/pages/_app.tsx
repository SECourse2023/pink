import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { AuthContextProvider } from '../contexts/auth'
import Script from 'next/script'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AuthContextProvider>
      <Script src="https://cdn.jsdelivr.net/npm/@unocss/runtime" async></Script>
      <Script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js" async></Script>
    </>
  )
}

export default App
