import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import SEO from './SEO'
import Header from './Header'

export default function Layout({ children, home }) {
  return (
    <div className=''>
      <Head>
        <title>{"Vet Mama"}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <header>
        <Header />
      </header>
      <main className='container m-auto mt-12'>{children}</main>
    </div>
  )
}
