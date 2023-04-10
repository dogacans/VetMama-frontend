import Link from "next/link"
import Image from "next/image"

export default function Header () {
    return (
        <div className='container flex border
        rounded-xl bg-white m-auto mt-10 h-20 border-red-400'>
          <Link href={"/"}>
            <Image  className="border rounded-full ml-10 -mt-10 lg:-mt-5 border-blue-600" src={"/header-image.jpg"} alt='Website Logo' width={150} height={150} />
          </Link>

          <ul className='ml-24 flex center my-auto'>
            <li className='mr-10 border rounded-xl p-2 border-orange-600'>
              <Link href={"/"}>
                Özelliğe Göre Ara
              </Link>
            </li>

            <li className='mr-10 border rounded-xl p-2 border-orange-600'>
              <Link href={"/kedi-mamalari"}>
                Kedi Mamaları
              </Link>
            </li>

            <li className='mr-10 border rounded-xl p-2 border-orange-600'>
              <Link href={"/kopek-mamalari"}>
                Köpek Mamaları
              </Link>
            </li>
          </ul>

        </div>
    )
}