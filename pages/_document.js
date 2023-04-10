import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='bg-neutral-200 2xl:text-[20px] motion-safe:scroll-smooth'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
