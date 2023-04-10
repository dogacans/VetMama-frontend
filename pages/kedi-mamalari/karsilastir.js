import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import Link from 'next/link'
import FeedCard from '@/components/FeedCard'
import { useState, useEffect } from 'react'

export default function CatFeed({contents}) {

    const [toBeCompared, setToBeCompared] = useState([])
    const [searchLink, setSearchLink] = useState("#")
    const field_names = {id : "",
        feed_id : "",
        composition : "İçerik",
        protein_percentage : "Protein Yüzdesi",
        fat_percentage : "Yağ Yüzdesi",
        crude_fiber_percentage : "Ham Selüloz Yüzdesi",
        crude_ash_percentage : "Ham Kül Yüzdesi",
        calcium_percentage : "Kalsiyum",
        phosphorus_percentage : "Fosfor",
        sodium_percentage : "Sodyum",
        potassium_percentage : "Potasyum",
        magnesium_percentage : "Magnezyum",
        vitamin_a : "A Vitamini",
        vitamin_d3 : "D Vitamini",
        vitamin_e : "E Vitamini",
        vitamin_c : "C Vitamini",
        beta_carotene : "Beta Karoten",
        total_iodine : "İyot",
        l_carnitine : "L-Karnitin",
        omega_3_fatty_acids : "Omega 3 Yağ Asitleri",
        taurine : "Taurin",
        zinc : "Çinko",
        manganese : "Manganez",
        iron : "Demir",
        copper : "Bakır",
        contains_grains : "Tahıl İçeriği"
    }
    useEffect(() => {
        let searchParams = []
        for (let i = 0; i < toBeCompared.length; i++) {
            searchParams.push(toBeCompared[i].feed_id)
        }


        setSearchLink(`/kedi-mamalari/karsilastir?${searchParams.join("&")}`)
      }, [toBeCompared])

    console.log('contents: ', contents);
    console.log('contents.content: ', contents.content);
    return (
        <Layout>
            <div className='flex justify-between'>
                {
                    contents.map(feed => {
                        return (
                            <div key={`${feed.content.id}`} className='flex flex-col'>
                                <div className='flex flex-col justify-between h-96 mx-10 mb-10'>
                                    <div className="flex justify-center">
                                        <Image src={feed.packaging.image_url} height={200} width={161} alt={`${feed.description} Fotoğrafı`}/>
                                    </div>
                                    <div className="mt-5">
                                        <p className="bold text-xl text-red-600">{feed.packaging.name}</p>
                                        <p className="mt-5 h-10">{feed.packaging.description}</p>
                                    </div>
                                </div>
                                
                                {
                                    Object.keys(feed.content).map((content_key, i) => {
                                        return (
                                            <div key={`${content_key}`} className='flex flex-col mx-10'>
                                                {field_names[content_key] !== "" &&
                                                    <div>{field_names[content_key]} - {Object.values(feed.content)[i]}</div>
                                                }
                                                {field_names[content_key] !== "" &&
                                                    <div className='w-full border m-1 border-blue-500'></div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let contents = [];
    let res;
    let feeds;
    for (let i = 0; i < Object.keys(context.query).length; i++) {
        res = await fetch(`http://localhost:3001/getFeedContent/${Object.keys(context.query)[i]}`)
        feeds = await res.json()
        contents.push({content: feeds[0][0], packaging: feeds[1][0]})
    }
    
    return {
        props: {
            contents,
        },
    }
}
