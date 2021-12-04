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

export async function getStaticProps({ params }) {

    let hasMemberQuery = false;
    let hasUnitQuery = false;
    let currentMember = {};
    let currentUnit = {};

    let memberQuery = `members?_sort=sort_order:ASC&`;
    let unitQuery = `units?[discography_types.id]=${DISCOGRAPHY_TYPE}&_sort=id:ASC&`;
    let releaseTypeQuery = `release-types?[discography_type.id]=${DISCOGRAPHY_TYPE}&_sort=id:ASC&`;
    let languageQuery = `languages?&_sort=id:ASC`;
    let albumQuery = `albums?_sort=release_date:ASC&[release_type.discography_type]=${DISCOGRAPHY_TYPE}&`;
    let songQuery = `songs?_sort=album.release_date:ASC,track_number:ASC&_limit=-1&[album.release_type.discography_type]=${DISCOGRAPHY_TYPE}&`;

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
        revalidate: 3600 //One hour in seconds
    }
}

export default Main;