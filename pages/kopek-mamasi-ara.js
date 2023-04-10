import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'
import Link from 'next/link'
import Choice from '@/components/Choice'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function SearchDogFeed({parameters}) {
  // console.log('parameters: ', parameters);
  const [age, setAge] = useState(0)
  const [specs, setSpecs] = useState(0)
  const [feedType, setFeedType] = useState(0)
  const [flavor, setFlavor] = useState(0)
  const [breedSize, setBreedSize] = useState(0)
  const [grains, setGrains] = useState(0)
  const [kibbleSize, setKibbleSize] = useState(0)
  const [breed, setBreed] = useState(0)
  const [searchLink, setSearchLink] = useState("#")
  const [currentWindow, setCurrentWindow] = useState(0)
  let windows = [
    {
      label : "Köpeğinizin yaş aralığı nedir?",
      choice : <Choice options={parameters.ages} stateFunc={setAge} selectedState={age}/>
    },
    {
      label : "Köpeğinizin sağlık sorunları var mı?",
      choice : <Choice options={parameters.specNames} stateFunc={setSpecs} selectedState={specs}/>
    },
    {
      label : "Köpeğiniz yem seçiyor mu? Lütfen aroma seçiniz.",
      choice : <Choice options={parameters.flavors} stateFunc={setFlavor} selectedState={flavor} />
    },
    {
      label : "Köpeğinizin ırk boyutu nedir?",
      choice : <Choice options={parameters.breeds} stateFunc={setBreedSize} selectedState={breedSize} />
    },
    {
      label : "Tahıllı veya tahılsız mama seçebilirsiniz.",
      choice : <Choice options={[{id: 0, name: "Tümü"}, {id: 1, name: "Tahılsız"}, {id: 2, name: "Tahıllı"}]} stateFunc={setGrains} selectedState={grains} />
    },
    {
      label : "Mama tanesi boyutu seçiniz.",
      choice : <Choice options={parameters.kibbleSizes} stateFunc={setKibbleSize} selectedState={kibbleSize} />
    }
  ]
  

  // console.log('age: ', age);
  // console.log('specs: ', specs);
  // console.log('feedType: ', feedType);
  // console.log('flavor: ', flavor);
  // console.log('breedSize: ', breedSize);
  // console.log('grains: ', grains);
  // console.log('kibbleSize: ', kibbleSize);
  // console.log('breed: ', breed);


  useEffect(() => {
    let types = {age_id : age,
      spec_id : specs,
      feedType : feedType,
      flavor_id : flavor,
      breed_id : breed,
      breedSize : breedSize,
      contains_grains : grains,
      kibble_size_id : kibbleSize
    }
    let params = []
    for (let i = 0; i < Object.keys(types).length; i++) {
      if (Object.values(types)[i] !== null && Object.values(types)[i] !== "0" && Object.values(types)[i] !== 0) {
        params.push(`${Object.keys(types)[i]}=${Object.values(types)[i]}`)
      }
    }
    setSearchLink(`/kopek-mamalari?${params.join("&")}`)
  }, [age,
    specs,
    feedType,
    flavor,
    breed,
    breedSize,
    grains,
    kibbleSize,
    breed])

    const prevWindow = (event) => {
      if (currentWindow !== 0) {
        setCurrentWindow(currentWindow - 1)
      }
    }
    const nextWindow = (event) => {
      if (currentWindow !== windows.length - 1) {
        setCurrentWindow(currentWindow + 1)
      }
    }
    //  <Choice options={parameters.flavors} stateFunc={setFlavor} />
  return (
    <Layout>
      <div className='mt-12 border flex flex-col m-5 items-center  rounded-xl'>
        <div className='border border-blue-400 rounded-xl w-3/4 h-[32rem] m-10 flex flex-col items-center justify-between p-4 bg-neutral-100'>
          <div className='flex'>
            {
              windows.map((window, i) => {
                return (
                  <div key={window.label}
                    className={
                      clsx({
                          "h-2" : true,
                          "w-10" : true,
                          "m-1" : true,
                          "bg-gray-200" :  i !== currentWindow,
                          "bg-blue-500" : i === currentWindow
                      })
                    }
                  ></div>
                )
              })
            }
            
          </div>
          <div className='flex flex-col items-center h-[93rem]'>
            <div className='mt-10 mb-5'>
              <label>{windows[currentWindow].label}</label> 
            </div>
            {windows[currentWindow].choice}
            <div></div>
          </div>
          <div className='flex flex-col'>
            <div>
              <button className='mx-10 p-2 bg-blue-600 text-white rounded-md w-24' onClick={prevWindow}>Geri</button>
              <button className='mx-10 p-2 bg-blue-600 text-white rounded-md w-24' onClick={nextWindow}>İleri</button>
              <Link   className='mx-10 p-2 bg-blue-600 text-white rounded-md w-24' href={searchLink}>
                Mama Ara
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3001/searchParameters/dog')
  let parameters = await res.json()

  for (let i = 0; i < Object.keys(parameters).length; i++) {
      parameters[Object.keys(parameters)[i]].unshift({
          name : "Tümü",
          id : 0
        })
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      parameters,
    },
  }
}
