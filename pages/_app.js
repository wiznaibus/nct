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
        <title>NCT Discography</title>
      </Head>
      <div className="flex flex-col h-screen font-light text-gray-800">
        <div className="flex-grow">
          <Header />
          <FilterMembersProvider>
            <div className="flex flex-col flex-wrap flex-grow">
              <Component {...pageProps} />
            </div>
          </FilterMembersProvider>
        </div>
        <footer className="pb-8 flex flex-nowrap gap-x-1 justify-center text-sm bottom-0">Made with love 💚 by
          <Link href="https://github.com/wiznaibus/nct" passHref={true}>
            <a target="_blank" className="text-nct127 underline hover:text-gray-700">wiznaibus</a>
          </Link>
        </footer>
      </div>
    </>
  )
};

export default MyApp;