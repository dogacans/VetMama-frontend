import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { clsx } from 'clsx';

export default function FeedCard (props) {

    let feed = props.feed;

    const adjustCompare = (event) => {
        props.setCompare([...props.toBeCompared, feed]);
    }

    return (
        <div className='rounded-xl bg-slate-300 m-7 p-5 flex flex-col justify-between'>
                    <div className="flex justify-center">
                        <Image src={feed.image_url} height={250} width={161} alt={`${feed.description} Fotoğrafı`}/>
                    </div>
                    <div className="mt-5">
                        <p className="bold text-xl text-red-600">{feed.name}</p>
                        <p className="mt-5">{feed.description}</p>
                        <div className="flex justify-between text-center mt-5">
                            <a href={feed.product_url} className="text-center my-auto">{feed.price.toFixed(2)} TL</a>
                            <button
                                className={clsx(
                                    {
                                        "rounded-md" : true,
                                        "p-2" : true,
                                        "text-white" : true,
                                        "bg-blue-500" : true,
                                    }
                                )}
                            onClick={adjustCompare}>Karşılaştır</button>
                        </div>
                    </div>
        </div>
    )
}