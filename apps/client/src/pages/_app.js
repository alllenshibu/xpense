
import { CookiesProvider } from 'react-cookie';

import '@/styles/globals.scss'


export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider >
      <Component {...pageProps} />
    </CookiesProvider >
  )
}
