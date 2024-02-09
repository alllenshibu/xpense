import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='h-screen'>
        <Main className="h-full w-full" />
        <NextScript />
      </body>
    </Html>
  )
}
