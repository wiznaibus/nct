import Link from 'next/link'
import Head from 'next/head'

function Home() {
    return (
        <>
            <Head>
                <title>NCT Discography</title>
                <meta name="description" content="This website is a discography project for the K-pop group NCT. It was designed to quickly and conveniently show what albums and songs each member participated in with the ability to search and filter results" />
                <meta property="og:title" content="About - NCT Discography" />
                <meta property="og:description" content="This website is a discography project for the K-pop group NCT. It was designed to quickly and conveniently show what albums and songs each member participated in with the ability to search and filter results" />
                <meta property="og:url" content="https://www.nctdiscography.com/about/" />
                <meta name="twitter:title" content="About - NCT Discography" />
                <meta name="twitter:description" content="This website is a discography project for the K-pop group NCT. It was designed to quickly and conveniently show what albums and songs each member participated in with the ability to search and filter results" />
                <meta property="twitter:url" content="https://www.nctdiscography.com/about/" />
            </Head>
            <main className="px-2 py-1 mt-2 lg:px-10">
                <div className="container mx-auto flex flex-col-reverse lg:flex-row px-1 py-2 lg:px-3">
                    <div className="w-full lg:w-1/2 mb-6 lg:px-2">
                        <div className="mb-6">
                            <h2 className="title text-black font-medium text-3xl mb-2">About</h2>
                            <p className="">This website is a discography project for the K-pop group NCT. It was designed to quickly and conveniently show what albums and songs each member participated in with the ability to search and filter results.</p>
                        </div>
                        <div className="mb-6">
                            <h2 className="title text-black font-medium text-3xl mb-2">Thanks to</h2>
                            <p>
                                <ul>
                                    <li><Link href="https://discord.com/invite/nct" passHref={true}><a className="text-nct127 underline hover:text-gray-700" target="_blank">NCTcord</a></Link> - Lots of suggestions, testing, data corrections, and moral support 💚</li>
                                    <li><Link href="https://www.reddit.com/r/NCT/" passHref={true}><a className="text-nct127 underline hover:text-gray-700" target="_blank">/r/NCT</a></Link> - Referencing information</li>
                                    <li><Link href="https://open.spotify.com/playlist/4YXrOk9EWh0ieYC7vScoOm" passHref={true}><a className="text-nct127 underline hover:text-gray-700" target="_blank">NCT full discography</a></Link> - Referencing information</li>
                                </ul>
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="title text-black font-medium text-3xl mb-2">Noticed a mistake or have a suggestion?</h2>
                            <p>You can report issues <Link href="https://github.com/wiznaibus/nct/issues" passHref={true}><a className="text-nct127 underline hover:text-gray-700" target="_blank">here</a></Link> or contact me through Twitter or Discord: <Link href="https://twitter.com/wiznaibus" passHref={true}><a className="text-nct127 underline hover:text-gray-700" target="_blank">@wiznaibus</a></Link> / wiznaibus#8413</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 mb-10">
                        <img className="p-px border border-black" src="/images/preview.png" />
                    </div>

                </div>
            </main>
        </>
    )
}

export default Home;