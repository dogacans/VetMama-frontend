import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>

      <div className='flex flex-col md:flex-row mt-12 container p-5'>
        <div className='border rounded-xl border-blue-600 p-10 container h-96 m-10 flex flex-col justify-center bg-neutral-100'>
          <Link href="/kopek-mamasi-ara">
            <div className='mx-auto w-64'>
              <Image src={"/homepage_dog.png"}
              className="pt-10 mx-auto bg-yellow-400 rounded-xl"
              width={256}
              height={256}
              />
              <div className="text-center mt-10">
              Köpeğim için mama
              </div>
            </div>
          </Link>
        </div>

        <div className='border border-blue-600 rounded-xl border-xl container h-96 m-10 flex flex-col justify-center bg-neutral-100'>
          <Link href="/kedi-mamasi-ara">
            <div className='mx-auto w-64'>
              <Image src={"/homepage_cat.png"}
              className='pt-5 mx-auto  bg-yellow-400 rounded-xl'
              width={256}
              height={256}
              />
              <div className="text-center mt-5">
                Kedim için mama
              </div>
            </div>
          </Link>
        </div>
      </div>

    </Layout>
  )
}
