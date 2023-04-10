import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import Link from 'next/link'
import FeedCard from '@/components/FeedCard'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
export default function DogFeed({feeds}) {

    const [toBeCompared, setToBeCompared] = useState([])
    const [searchLink, setSearchLink] = useState("#")

    useEffect(() => {
        let searchParams = []
        for (let i = 0; i < toBeCompared.length; i++) {
            searchParams.push(toBeCompared[i].feed_id)
        }


        setSearchLink(`/kopek-mamalari/karsilastir?${searchParams.join("&")}`)
      }, [toBeCompared])


    return (
        <Layout>
            {
                toBeCompared.length !== 0 &&
                    <div className='border flex mb-6 p-5 justify-between bg-neutral-50 border-blue-600 rounded-xl'>
                        {
                            toBeCompared.map(compare => {
                                return (
                                    <div className='border rounded-md p-3 m-2 bg-slate-300'
                                    key={[compare.id, compare.name]}>
                                        <div className='flex'> 
                                        <div className='text-blue-600 my-auto'>{compare.name}</div>
                                        <button className='text-2xl text-red-600 my-auto ml-2'
                                            onClick={() => setToBeCompared(toBeCompared.filter(cmp => cmp.id !== compare.id))}
                                        >x
                                            </button>
                                        </div>
                                        <div>{compare.description}</div>
                                    </div>

                                )
                            })
                        }
                        <Link href={toBeCompared.length === 1 ? {} : searchLink}
                            className={clsx(
                                {
                                    "border" : true,
                                    "rounded-md" : true,
                                    "p-2" : true,
                                    "text-white" : true,
                                    "bg-blue-500" : true,
                                    "grayscale": toBeCompared.length === 1
                                }
                            )}
                        >
                        Karşılaştır
                        </Link>
                    </div>
            }
            <div className='border border-blue-600 rounded-xl grid grid-cols-4 bg-neutral-50'>
                {
                    feeds.length !== 0 &&
                        feeds.map(feed => {
                            return <FeedCard key={`${feed.feed_id}, ${feed.description}`} feed={feed} setCompare={setToBeCompared} toBeCompared={toBeCompared}/>
                        })
                }
                {
                    feeds.length === 0 && 
                        <div className='text-2xl p-10'>There are no such feed with these criteria!</div>
                }
                
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts
    let queryString = context.resolvedUrl.replace("/kopek-mamalari", "")
    const res = await fetch(`http://localhost:3001/searchFeed/dog/${queryString}`)
    const feeds = await res.json()

    return {
        props: {
            feeds,
        },
    }
}
