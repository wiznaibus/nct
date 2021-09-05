import '../styles/globals.css'
import Head from 'next/head'
import { FilterMembersProvider } from '../components/FilterMembers';

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NCT Discography</title>
      </Head>
      <FilterMembersProvider>
        <div className="text-gray-800 flex flex-col h-screen 
        px-2 py-1
        lg:pt-4 lg:px-10">
          <Component {...pageProps} />
        </div>
      </FilterMembersProvider>
    </>
  )
};

export default MyApp;