// Next
import { AppProps } from 'next/app'
import React from 'react'
import { Header } from '../components/Header'
import { Provider as NextAuthProvider } from 'next-auth/client';
// Styles
import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}


