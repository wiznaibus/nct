import Link from 'next/link';
import Head from 'next/head';

function Home() {
    return (
        <>
            <Head>
                <title>Home - NCT Discography</title>
                <meta name="description" content="View full NCT discography in order with all units. Filter songs by member and unit" />
                <meta property="og:title" content="Home - NCT Discography" />
                <meta property="og:description" content="View full NCT discography in order with all units. Filter songs by member and unit" />
                <meta property="og:url" content="https://www.nctdiscography.com/" />
                <meta name="twitter:title" content="Home - NCT Discography" />
                <meta name="twitter:description" content="View full NCT discography in order with all units. Filter songs by member and unit" />
                <meta property="twitter:url" content="https://www.nctdiscography.com/" />
            </Head>
            <div className="container px-3 mx-auto my-48">
                <div className="mx-auto w-full md:w-2/3 xl:w-1/2 flex flex-nowrap items-center gap-x-1">
                    <p className="text-4xl lg:text-5xl pb-5">The home page is still under construction. Visit the <Link href="/discography"><a className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white">Discography</a></Link> page?</p>
                    <img className="h-24 w-24 p-px border dark:bg-black border-black dark:border-white object-right" src="https://assets.nctdiscography.com/thumbnail_haechanpeek_180633a969.png" alt="Haechan peeking through curtains" />
                </div>
            </div>
        </>
    )
}

export default Home;
