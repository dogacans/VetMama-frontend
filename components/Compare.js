import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import Link from 'next/link'
import FeedCard from '@/components/FeedCard'
import { useState, useEffect } from 'react'

export default function Compare(props) {
    const [searchLink, setSearchLink] = useState("#")

    useEffect(() => {
        let searchParams = []
        for (let i = 0; i < props.toBeCompared.length; i++) {
            searchParams.push(props.toBeCompared[i].feed_id)
        }
        setSearchLink(`/kopek-mamalari/karsilastir?${searchParams.join("&")}`)
      }, [props.toBeCompared])


    return (
                    <div className='border border-yellow-300 flex mb-6 p-5 justify-between'>
                        {
                            props.toBeCompared.map(compare => {
                                return (
                                    <div className='border rounded-md p-3 m-2'
                                    key={[compare.id, compare.name]}>
                                        <div className='flex'> 
                                        <div className='text-yellow-400 my-auto'>{compare.name}</div>
                                        <button className='text-2xl  text-red-600 my-auto ml-2'
                                            onClick={() => props.setToBeCompared(props.toBeCompared.filter(cmp => cmp.id !== compare.id))}
                                        >x
                                            </button>
                                        </div>
                                        <div>{compare.description}</div>
                                    </div>

                                )
                            })
                        }
                        <Link className='border rounded-md p-2 text-white bg-slate-700' href={searchLink}>
                        Karşılaştır
                        </Link>
                    </div>
    )
}
