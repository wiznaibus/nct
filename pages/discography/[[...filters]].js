
import Head from 'next/head'

import DiscographyHeader from "../../components/DiscographyHeader";
import Album from "../../components/Album"

//main discography
const DISCOGRAPHY_TYPE = 1;

function Discography({
    hasMemberQuery,
    hasUnitQuery,
    currentMember,
    currentUnit,
    units,
    members,
    albums,
    albumCount,
    songCount
}) {

    
    /**
     * Generate variables for meta tags
     */
    const metaFormattedName = (!hasUnitQuery && !hasMemberQuery) ? 'NCT ' 
        : (hasUnitQuery ? currentUnit.name + ' ' : '') + (hasMemberQuery ? currentMember.name + ' ' : '');
    const metaUrl = 'https://www.nctdiscography.com/' + (hasUnitQuery ? currentUnit.slug + '/' : '') + (hasMemberQuery ? currentMember.slug + '/' : '');

    return (
        <>
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

            <DiscographyHeader
                hasMemberQuery={hasMemberQuery}
                hasUnitQuery={hasUnitQuery}
                currentMember={currentMember}
                currentUnit={currentUnit}
                members={members}
                units={units}
                albumCount={albumCount}
                songCount={songCount} />

            <main className="px-2 py-1 mt-2 lg:px-10">
                <div className="container mx-auto px-1 py-2 lg:px-3">
                    {
                        albumCount > 0 
                            ? albums.map(album => (
                                <Album
                                    key={`album-${album.id}`}
                                    hasMemberQuery={hasMemberQuery}
                                    hasUnitQuery={hasUnitQuery}
                                    currentMember={currentMember}
                                    currentUnit={currentUnit}
                                    id={album.id}
                                    title={album.title}
                                    slug={album.slug}
                                    releaseDate={album.release_date}
                                    releaseType={album.release_type}
                                    coverImage={album.cover_image}
                                    artists={album.artists}
                                    members={album.performing_artists}
                                    songs={album.songs}
                                    languages={album.languages}
                                    links={album.links}
                                />
                            )) 
                            : <p className="text-center">No results found</p>
                    }
                </div>
            </main>
        </>
    )
}

export async function getStaticPaths() {
    const unitsFetch = await fetch(`${process.env.API_URL}/units?[discography_types.id]=${DISCOGRAPHY_TYPE}`);
    const units = await unitsFetch.json();

    const membersFetch = await fetch(`${process.env.API_URL}/members`);
    const members = await membersFetch.json();

    const paths = [];
    paths.push({ params: { filters: [] } });

    //generate paths for members
    members.map(member => (paths.push({ params: { filters: [member.slug] } })));

    //generate paths for units
    units.map(unit => {
        paths.push({ params: { filters: [unit.slug] } });
        unit.artists.map(artist => {
            artist.performing_artists.map(member => {
                paths.push({ params: { filters: [unit.slug, member.slug] } })
            });
        });
    });

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {

    let hasMemberQuery = false;
    let hasUnitQuery = false;
    let currentMember = {};
    let currentUnit = {};
    
    /**
     * Query the current member and unit
     */
    if (params.filters) {
        if (params.filters.length > 1) {
            const memberFetch = await fetch(`${process.env.API_URL}/members?[slug]=${params.filters[1]}`);
            currentMember = await memberFetch.json();
            currentMember = currentMember[0];

            const unitFetch = await fetch(`${process.env.API_URL}/units?[discography_types.id]=${DISCOGRAPHY_TYPE}&[slug]=${params.filters[0]}`);
            currentUnit = await unitFetch.json();
            currentUnit = currentUnit[0];
            
            hasMemberQuery = true;
            hasUnitQuery = true;
        } else {
            //check if query filter is for unit
            const unitCountFetch = await fetch(`${process.env.API_URL}/units/count?[discography_types.id]=${DISCOGRAPHY_TYPE}&[slug]=${params.filters[0]}`);
            if (await unitCountFetch.json() > 0) {
                const unitFetch = await fetch(`${process.env.API_URL}/units?[discography_types.id]=${DISCOGRAPHY_TYPE}&[slug]=${params.filters[0]}`);
                currentUnit = await unitFetch.json();
                currentUnit = currentUnit[0];
                hasUnitQuery = true;
            }
            else {
                const memberFetch = await fetch(`${process.env.API_URL}/members?[slug]=${params.filters[0]}`);
                currentMember = await memberFetch.json();
                currentMember = currentMember[0];
                hasMemberQuery = true;
            }
        }
    }


    let memberQuery = `members?_sort=sort_order:ASC&`;
    let unitQuery = `units?[discography_types.id]=${DISCOGRAPHY_TYPE}&_sort=id:ASC&`;
    let albumQuery = `albums?_sort=release_date:ASC&[release_type.discography_type]=${DISCOGRAPHY_TYPE}&`;
    //let albumCountQuery = `albums/count?`;
    let songCountQuery = `songs/count?[album.release_type.discography_type]=${DISCOGRAPHY_TYPE}&`;

    /**
     * Create query filters based on current member/unit
     */
    memberQuery += hasUnitQuery ? `[performing_artists.artist.unit]=${currentUnit.id}` : ``;
    unitQuery += hasMemberQuery ? `[artists.performing_artists.member.id]=${currentMember.id}` : ``;
    albumQuery += (hasMemberQuery && hasUnitQuery) 
        ? `_where[performing_artists.member.id]=${currentMember.id}&[performing_artists.artist.unit]=${currentUnit.id}` 
        : hasMemberQuery ? `[performing_artists.member.id]=${currentMember.id}` 
        : hasUnitQuery ? `[artists.unit.id]=${currentUnit.id}`
        : ``;
   /*  albumCountQuery += (hasMemberQuery && hasUnitQuery) 
        ? `[performing_artists.member.id]=${currentMember.id}&[artists.id]=${currentUnit.id}` 
        : hasMemberQuery ? `[performing_artists.id]=${currentMember.id}` 
        : hasUnitQuery ? `[artists.id]=${currentUnit.id}`
        : ``; */
    songCountQuery += (hasMemberQuery && hasUnitQuery) 
        ? `_where[performing_artists.member.id]=${currentMember.id}&[performing_artists.artist.unit]=${currentUnit.id}` 
        : hasMemberQuery ? `[performing_artists.member.id]=${currentMember.id}` 
        : hasUnitQuery ? `[artists.unit.id]=${currentUnit.id}`
        : ``;


    let members = {};
    let units = {};
    let albums = {};
    let albumCount = 0;
    let songCount = 0;

    /**
     * Query members, units, and albums
     */
    const membersFetch = await fetch(`${process.env.API_URL}/${memberQuery}`);
    members = await membersFetch.json();
    const unitsFetch = await fetch(`${process.env.API_URL}/${unitQuery}`);
    units = await unitsFetch.json();
    const albumsFetch = await fetch(`${process.env.API_URL}/${albumQuery}`);
    albums = await albumsFetch.json();
    albumCount = albums.length;
    const songCountFetch = await fetch(`${process.env.API_URL}/${songCountQuery}`);
    songCount = await songCountFetch.json();


    return {
        props: {
            hasMemberQuery,
            hasUnitQuery,
            currentMember,
            currentUnit,
            units,
            members,
            albums,
            albumCount,
            songCount
        },
        revalidate: false
    }
}

export default Discography;
