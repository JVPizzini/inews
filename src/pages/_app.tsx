// Next
import { AppProps } from 'next/app'
import React from 'react'
import { Header } from '../components/Header'

// Styles
import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}


