import '@/styles/globals.css'
import LayOut from 'components/Layout'
import SearchProvider from 'context/searchProvider'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <SearchProvider>
    <LayOut>
      <Component {...pageProps} />
    </LayOut>
  </SearchProvider>
}
