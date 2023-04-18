import type { PropsWithChildren } from 'react'
import NavBar from './navbar'
import Footer from './footer'
import { Box } from '@chakra-ui/react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavBar />
      <Box minH="80vh">{children}</Box>
      <Footer />
    </>
  )
}
