import Link from 'next/link'
import Head from 'next/head'

function Home() {
    return (
        <>
            <Head>
                <title>NCT Discography</title>
                <meta name="description" content="View full NCT discography in order with all units. Filter songs by member and unit" />
                <meta property="og:title" content="NCT Discography" />
                <meta property="og:description" content="View full NCT discography in order with all units. Filter songs by member and unit" />
                <meta property="og:url" content="https://www.nctdiscography.com/" />
                <meta name="twitter:title" content="NCT Discography" />
                <meta name="twitter:description" content="View full NCT discography in order with all units. Filter songs by member and unit" />
                <meta property="twitter:url" content="https://www.nctdiscography.com/" />
            </Head>
            <div className="container px-3 mx-auto my-48">
                <div className="mx-auto w-full md:w-2/3 xl:w-1/2 flex flex-nowrap items-center gap-x-1">
                    <p className="text-4xl lg:text-5xl pb-5">The home page is still under construction. Visit the <Link href="/discography"><a className="text-nct127 underline hover:text-gray-700">Discography</a></Link> page?</p>
                    <img className="h-24 w-24 p-px border border-black object-right" src="/images/haechanpeek.png" />
                </div>
            </div>
        </>
    )
}

export default Home;
