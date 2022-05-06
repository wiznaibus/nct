import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'
import { FilterMenuVisibilityProvider } from '../components/Filter/FilterMenuVisibility';
import { FilterNonparticipatingMembersProvider } from '../components/Filter/FilterNonparticipatingMembers'
import { FilterDuplicateTracksProvider } from '../components/Filter/FilterDuplicateTracks';
import { ThemeProvider } from 'next-themes';

const combineProviders = (providers) => providers.reduce(
  (Combined, Provider) => ({ children }) => (
    <Combined>
      <Provider>
        {children}
      </Provider>
    </Combined>
  )
);

const MyApp = ({ Component, pageProps, router }) => {

  const Providers = combineProviders([
    FilterMenuVisibilityProvider,
    FilterNonparticipatingMembersProvider,
    FilterDuplicateTracksProvider
  ]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://assets.nctdiscography.com/preview_907384fe22.png?height=530&pad_color=F8F8F8&width=1013" />
        <meta property="og:image:secure_url" content="https://assets.nctdiscography.com/preview_907384fe22.png?height=530&pad_color=F8F8F8&width=1013" />
        <meta property="og:image:width" content="1013" />
        <meta property="og:image:height" content="530" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="nctdiscography.com" />
        <meta property="twitter:text:title" content="NCT Discography" />
        <meta property="twitter:image" content="https://assets.nctdiscography.com/preview_907384fe22.png" />
        <meta property="msapplication-TileColor" content="#da532c" />
        <meta property="theme-color" content="#F8F8F8" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4L2GDDSWMN"></script>
        <script src="/gtag.js"></script>"
      </Head>
      <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        themes={["light", "dark"]}
        enableSystem={true}
        enableColorScheme={true}
        storageKey="theme"
      >
        <div className="flex-grow">
          <Header />
          <Providers>
            <div className="flex flex-col flex-wrap flex-grow">
              <Component {...pageProps} />
            </div>
          </Providers>
        </div>
        <footer className="pb-12 bottom-0 text-center">
          <p className="text-sm">
            Made with love 💚 by <Link href="https://twitter.com/wiznaibus" passHref={true}>
              <a target="_blank" rel="noreferrer noopener" className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white">wiznaibus</a>
            </Link>
          </p>
        </footer>
      </ThemeProvider>
    </>
  )
};

export default MyApp;