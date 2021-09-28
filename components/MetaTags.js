import Head from 'next/head'

const MetaTags = ({
    hasUnitQuery = false,
    hasMemberQuery = false,
    metaFormattedName = "NCT",
    metaUrl = "https://www.nctdiscography.com",
    albumCount = 0,
    songCount = 0
}) => {
    return (
        <Head>
            <title>{(hasUnitQuery || hasMemberQuery) ? metaFormattedName + 'Songs - ' : ''}NCT Discography</title>
            <meta name="description" content={`${metaFormattedName}has ${albumCount} albums and ${songCount} songs. View full NCT discography in order with all units. Filter songs by member and unit`} />
            <meta property="og:title" content={metaFormattedName ? metaFormattedName + 'Songs' : 'NCT Discography'} />
            <meta property="og:description" content={`${metaFormattedName}has ${albumCount} albums and ${songCount} songs. View full NCT discography in order with all units. Filter songs by member and unit`} />
            <meta property="og:url" content={metaUrl} />
            <meta name="twitter:title" content={`${(hasUnitQuery || hasMemberQuery) ? metaFormattedName + 'Songs - ' : ''}NCT Discography`} />
            <meta name="twitter:description" content={`${metaFormattedName}has ${albumCount} albums and ${songCount} songs. View full NCT discography in order with all units. Filter songs by member and unit`} />
            <meta property="twitter:url" content={metaUrl} />
        </Head>
    );
}

export default MetaTags;