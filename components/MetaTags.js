import Head from 'next/head'

const MetaTags = ({
    pageTitle = "Discography",
    metaFormattedName = "NCT",
    metaUrl = "https://www.nctdiscography.com",
    albumCount = 0,
    songCount = 0
}) => {
    return (
        <Head>
            <title>{`${pageTitle} - NCT Discography`}</title>
            <meta name="description" content={`${metaFormattedName}has ${albumCount} albums and ${songCount} songs. View full NCT discography in order with all units. Filter songs by member and unit`} />
            <meta property="og:title" content={`${pageTitle} - NCT Discography`} />
            <meta property="og:description" content={`${metaFormattedName}has ${albumCount} albums and ${songCount} songs. View full NCT discography in order with all units. Filter songs by member and unit`} />
            <meta property="og:url" content={metaUrl} />
            <meta name="twitter:title" content={`${pageTitle} - NCT Discography`} />
            <meta name="twitter:description" content={`${metaFormattedName}has ${albumCount} albums and ${songCount} songs. View full NCT discography in order with all units. Filter songs by member and unit`} />
            <meta property="twitter:url" content={metaUrl} />
        </Head>
    );
}

export default MetaTags;