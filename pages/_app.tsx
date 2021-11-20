import '@/styles/globals.sass'
import smoothscroll from 'smoothscroll-polyfill'
import type { AppProps } from 'next/app'

if (typeof window !== 'undefined') {
  smoothscroll.polyfill()
}

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default MyApp
