import Link from 'next/link'
import Image from 'next/image'

function Home() {
    return (
        <div className="container px-3 mx-auto my-48">
            <div className="mx-auto w-full md:w-2/3 xl:w-1/2 flex flex-nowrap items-center gap-x-1">
                <p className="text-4xl md:text-5xl pb-5">There's nothing here yet. Visit the <Link href="/discography"><a className="text-nct127 underline hover:text-gray-700">Discography</a></Link> page?</p>
                <img className="h-24 w-24 p-px border border-black object-right" src="/images/haechanpeek.png" />
            </div>
        </div>
    )
}

export default Home;
