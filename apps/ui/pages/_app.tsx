import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { AuthContextProvider } from '../contexts/auth'
import Head from 'next/head'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime" async></script>
        <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime/uno.global.js" async></script>
      </Head>
      <AuthContextProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
