import Link from 'next/link';
import Head from 'next/head';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

function Home() {
    const [ mounted, setMounted ] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) {
        return null
    }

    return (
        <>
            <Head>
                <title>About - NCT Discography</title>
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
                            <h2 className="title text-black dark:text-white font-medium text-3xl mb-2">About</h2>
                            <p>This website is a discography project for the K-pop group NCT. It was designed to quickly and conveniently show what albums and songs each member participated in with the ability to search and filter results.</p>
                        </div>
                        <div className="mb-6">
                            <h2 className="title text-black dark:text-white font-medium text-3xl mb-2">Media</h2>
                            <p>
                                <ul>
                                    <li><Link href="https://www.envimedia.co/a-guide-to-nct-discography/">
                                        <a className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white" target="_blank">EnVi Media - A GUIDE TO “NCT DISCOGRAPHY”</a>
                                    </Link></li>
                                </ul>
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="title text-black dark:text-white font-medium text-3xl mb-2">Thanks to</h2>
                            <p>
                                <ul>
                                    <li>
                                        <Link href="https://discord.com/invite/nct" passHref={true}>
                                            <a className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white" target="_blank">NCTcord</a>
                                        </Link> - Lots of suggestions, testing, data corrections, and moral support 💚</li>
                                    <li>
                                        <Link href="https://www.reddit.com/r/NCT/" passHref={true}>
                                            <a className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white" target="_blank">/r/NCT</a>
                                        </Link> - Referencing information
                                    </li>
                                    <li>
                                        <Link href="https://open.spotify.com/playlist/4YXrOk9EWh0ieYC7vScoOm" passHref={true}>
                                            <a className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white" target="_blank">NCT full discography</a>
                                        </Link> - Referencing information
                                    </li>
                                </ul>
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="title text-black dark:text-white font-medium text-3xl mb-2">Noticed a mistake or have a suggestion?</h2>
                            <p>You can report issues <Link href="https://github.com/wiznaibus/nct/issues" passHref={true}><a className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white" target="_blank">here</a></Link> or contact me through Twitter or Discord: <Link href="https://twitter.com/wiznaibus" passHref={true}><a className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white" target="_blank">@wiznaibus</a></Link> / wiznaibus#8413</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 mb-10">
                        {
                            resolvedTheme === "light"
                            ? <img className="p-px border border-black" src="https://assets.nctdiscography.com/preview_907384fe22.png" alt="NCT group image" />
                            : <img className="p-px border dark:bg-black dark:border-white" src="https://assets.nctdiscography.com/preview_dark_46beaf12d6.png" alt="NCT group image" />
                        }
                    </div>

                </div>
            </main>
        </>
    )
}

export default Home;
