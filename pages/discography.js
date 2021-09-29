import { FilterMenuVisibilityProvider } from '../components/Filter/FilterMenuVisibility';
import { FilterNonparticipatingMembersProvider } from '../components/Filter/FilterNonparticipatingMembers'
import { FilterDuplicateTracksProvider } from '../components/Filter/FilterDuplicateTracks';
import { FilterReleaseTypeContext, FilterUnitContext, FilterLanguageContext, FilterMemberContext } from '../components/Filter/FilterContexts';
import Discography from '../components/Discography';
import { useState } from 'react';

//main discography
const DISCOGRAPHY_TYPE = 1;

function Main({
    hasMemberQuery,
    hasUnitQuery,
    currentMember,
    currentUnit,
    units,
    members,
    releaseTypes,
    languages,
    albums,
    songs
}) {
    const releaseTypeFilterDefaults = releaseTypes.map(releaseType => ({
        "id": releaseType.id,
        "discographyType": releaseType.discography_type.id,
        "name": releaseType.name,
        "filtered": false
    }));
    const unitFilterDefaults = units.map(unit => ({
        "id": unit.id,
        "name": unit.name,
        "filtered": false
    }));
    const languageFilterDefaults = languages.map(language => ({
        "id": language.id,
        "name": language.name,
        "filtered": false
    }));
    const memberFilterDefaults = members.map(member => ({
        "id": member.id,
        "name": member.name,
        "filtered": false
    }));

    const [releaseTypeFilter, setReleaseTypeFilter] = useState(releaseTypeFilterDefaults);
    const releaseTypeFilterProvider = { releaseTypeFilter, setReleaseTypeFilter };

    const [unitFilter, setUnitFilter] = useState(unitFilterDefaults);
    const unitFilterProvider = { unitFilter, setUnitFilter };

    const [languageFilter, setLanguageFilter] = useState(languageFilterDefaults);
    const languageFilterProvider = { languageFilter, setLanguageFilter };

    const [memberFilter, setMemberFilter] = useState(memberFilterDefaults);
    const memberFilterProvider = { memberFilter, setMemberFilter };

    return (
        <>
            <FilterReleaseTypeContext.Provider value={releaseTypeFilterProvider}>
                <FilterUnitContext.Provider value={unitFilterProvider}>
                    <FilterLanguageContext.Provider value={languageFilterProvider}>
                        <FilterMemberContext.Provider value={memberFilterProvider}>
                            <Discography
                                hasMemberQuery={hasMemberQuery}
                                hasUnitQuery={hasUnitQuery}
                                currentMember={currentMember}
                                currentUnit={currentUnit}
                                units={units}
                                members={members}
                                releaseTypes={releaseTypes}
                                languages={languages}
                                albums={albums}
                                songs={songs} />
                        </FilterMemberContext.Provider>
                    </FilterLanguageContext.Provider>
                </FilterUnitContext.Provider>
            </FilterReleaseTypeContext.Provider>
        </>
    )
}

/* export async function getStaticPaths() {
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
} */

export async function getStaticProps({ params }) {

    let hasMemberQuery = false;
    let hasUnitQuery = false;
    let currentMember = {};
    let currentUnit = {};

    /**
     * Query the current member and unit
     */
    /* if (params.filters) {
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
    } */


    let memberQuery = `members?_sort=sort_order:ASC&`;
    let unitQuery = `units?[discography_types.id]=${DISCOGRAPHY_TYPE}&_sort=id:ASC&`;
    let releaseTypeQuery = `release-types?[discography_type.id]=${DISCOGRAPHY_TYPE}&_sort=id:ASC&`;
    let languageQuery = `languages?&_sort=id:ASC`;
    let albumQuery = `albums?_sort=release_date:ASC&[release_type.discography_type]=${DISCOGRAPHY_TYPE}&`;
    let songQuery = `songs?_sort=album.release_date:ASC,track_number:ASC&_limit=-1&[album.release_type.discography_type]=${DISCOGRAPHY_TYPE}&`;

    /**
     * Create query filters based on current member/unit
     */
    /* memberQuery += hasUnitQuery ? `[performing_artists.artist.unit]=${currentUnit.id}` : ``;
    unitQuery += hasMemberQuery ? `[artists.performing_artists.member.id]=${currentMember.id}` : ``;
    albumQuery += (hasMemberQuery && hasUnitQuery)
        ? `_where[performing_artists.member.id]=${currentMember.id}&[performing_artists.artist.unit]=${currentUnit.id}`
        : hasMemberQuery ? `[performing_artists.member.id]=${currentMember.id}`
            : hasUnitQuery ? `[artists.unit.id]=${currentUnit.id}`
                : ``;
    songQuery += (hasMemberQuery && hasUnitQuery)
        ? `_where[performing_artists.member.id]=${currentMember.id}&[performing_artists.artist.unit]=${currentUnit.id}`
        : hasMemberQuery ? `[performing_artists.member.id]=${currentMember.id}`
            : hasUnitQuery ? `[artists.unit.id]=${currentUnit.id}`
                : ``; */


    let members = [];
    let units = [];
    let releaseTypes = [];
    let languages = [];
    let albums = [];
    let songs = [];

    /**
     * Query members, units, release types, languages, and albums
     */
    const membersFetch = await fetch(`${process.env.API_URL}/${memberQuery}`);
    members = await membersFetch.json();
    const unitsFetch = await fetch(`${process.env.API_URL}/${unitQuery}`);
    units = await unitsFetch.json();
    const releaseTypesFetch = await fetch(`${process.env.API_URL}/${releaseTypeQuery}`);
    releaseTypes = await releaseTypesFetch.json();
    const languagesFetch = await fetch(`${process.env.API_URL}/${languageQuery}`);
    languages = await languagesFetch.json();
    const albumsFetch = await fetch(`${process.env.API_URL}/${albumQuery}`);
    albums = await albumsFetch.json();
    const songsFetch = await fetch(`${process.env.API_URL}/${songQuery}`);
    songs = await songsFetch.json();


    return {
        props: {
            hasMemberQuery,
            hasUnitQuery,
            currentMember,
            currentUnit,
            units,
            members,
            releaseTypes,
            languages,
            albums,
            songs
        },
        revalidate: false
    }
}

export default Main;