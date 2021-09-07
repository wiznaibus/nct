import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'
import { FilterMembersProvider } from '../components/FilterMembers';

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://nctdiscography.com/images/preview.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="nctdiscography.com" />
        <meta property="twitter:text:title" content="NCT Discography" />
        <meta property="twitter:image" content="https://nctdiscography.com/images/preview.png" />
        <meta property="msapplication-TileColor" content="#da532c" />
        <meta property="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4L2GDDSWMN"></script>
        <script src="/gtag.js"></script>"
      </Head>
      <body className="flex flex-col h-screen font-light bg-light text-gray-800">
        <div className="flex-grow">
          <Header />
          <FilterMembersProvider>
            <div className="flex flex-col flex-wrap flex-grow">
              <Component {...pageProps} />
            </div>
          </FilterMembersProvider>
        </div>
        <footer className="pb-8 flex flex-nowrap gap-x-1 justify-center text-sm bottom-0">Made with love 💚 by
          <Link href="https://twitter.com/wiznaibus" passHref={true}>
            <a target="_blank" className="text-nct127 underline hover:text-gray-700">wiznaibus</a>
          </Link>
        </footer>
      </body>
    </>
  )
};

export default MyApp;