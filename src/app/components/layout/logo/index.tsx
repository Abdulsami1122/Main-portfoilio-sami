import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <>
        <Link href="/" className="block shrink-0 transition-transform hover:scale-105">
            <Image 
                src={"/favicon.jpeg"} 
                alt="logo" 
                width={70} 
                height={70}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-[70px] lg:h-[70px] object-cover rounded-full shadow-sm"
            />
        </Link>
    </>
  )
}

export default Logo