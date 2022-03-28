import MetaTags from './MetaTags';
import DiscographyHeader from "./DiscographyHeader";
import Album from "./Album"
import Link from 'next/link';
import { Switch } from '@headlessui/react'
import { Info, X, Search, Filter } from 'react-feather'
import { useContext, useEffect, useRef, useState } from 'react';

import { FilterNonparticipatingMembersStateContext } from './Filter/FilterNonparticipatingMembers'
import { FilterDuplicateTracksStateContext } from './Filter/FilterDuplicateTracks';

import { FilterMenuVisibilityStateContext } from './Filter/FilterMenuVisibility';
import { FilterReleaseTypeContext, FilterUnitContext, FilterLanguageContext, FilterMemberContext } from './Filter/FilterContexts';

import FilterMenu from './Filter/FilterMenu';
import FilterHeader from './Filter/FilterHeader';
import { Filter as FilterIcon } from 'react-feather'

const Discography = ({
    type = 1,
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
}) => {
    /**
     * Set up meta context (filter menu, nonparticipating members, and duplicate tracks)
     */
    const { filterMenuVisibility, setFilterMenuVisibility } = useContext(FilterMenuVisibilityStateContext);

    const { nonparticipatingMembersFilter, setNonparticipatingMembersFilter } = useContext(FilterNonparticipatingMembersStateContext);
    const { duplicateTracksFilter, setDuplicateTracksFilter } = useContext(FilterDuplicateTracksStateContext);

    const { releaseTypeFilter, setReleaseTypeFilter } = useContext(FilterReleaseTypeContext);
    const { unitFilter, setUnitFilter } = useContext(FilterUnitContext);
    const { languageFilter, setLanguageFilter } = useContext(FilterLanguageContext);
    const { memberFilter, setMemberFilter } = useContext(FilterMemberContext);

    const releaseTypeFilterOnChange = (id) => {
        const updateReleaseTypeFilter = releaseTypeFilter.map(releaseType => ({
            "id": releaseType.id,
            "discographyType": releaseType.discographyType,
            "name": releaseType.name,
            "filtered": releaseType.id === id ? !releaseType.filtered : releaseType.filtered
        }));
        setReleaseTypeFilter(updateReleaseTypeFilter);
    }

    const unitFilterOnChange = (id) => {
        const updateUnitFilter = unitFilter.map(unit => ({
            "id": unit.id,
            "name": unit.name,
            "filtered": unit.id === id ? !unit.filtered : unit.filtered
        }));
        setUnitFilter(updateUnitFilter);
    };

    const languageFilterOnChange = (id) => {
        const updateLanguageFilter = languageFilter.map(language => ({
            "id": language.id,
            "name": language.name,
            "filtered": language.id === id ? !language.filtered : language.filtered
        }));
        setLanguageFilter(updateLanguageFilter);
    };

    const memberFilterOnChange = (id) => {
        const updateMemberFilter = memberFilter.map(member => ({
            "id": member.id,
            "name": member.name,
            "filtered": member.id === id ? !member.filtered : member.filtered
        }));
        setMemberFilter(updateMemberFilter);
    };

    const clearFilter = (type) => {
        switch (type) {
            case "releaseType":
                let updateReleaseTypeFilter = releaseTypeFilter.map(releaseType => ({
                    "id": releaseType.id,
                    "discographyType": releaseType.discographyType,
                    "name": releaseType.name,
                    "filtered": false
                }));
                setReleaseTypeFilter(updateReleaseTypeFilter);
                break;
            case "unit":
                let updateUnitFilter = unitFilter.map(unit => ({
                    "id": unit.id,
                    "name": unit.name,
                    "filtered": false
                }));
                setUnitFilter(updateUnitFilter);
                break;
            case "language":
                let updateLanguageFilter = languageFilter.map(language => ({
                    "id": language.id,
                    "name": language.name,
                    "filtered": false
                }));
                setLanguageFilter(updateLanguageFilter);
                break;
            case "member":
                let updateMemberFilter = memberFilter.map(member => ({
                    "id": member.id,
                    "name": member.name,
                    "filtered": false
                }));
                setMemberFilter(updateMemberFilter);
                break;
            default:
                updateReleaseTypeFilter = releaseTypeFilter.map(releaseType => ({
                    "id": releaseType.id,
                    "discographyType": releaseType.discographyType,
                    "name": releaseType.name,
                    "filtered": false
                }));
                setReleaseTypeFilter(updateReleaseTypeFilter);
                updateUnitFilter = unitFilter.map(unit => ({
                    "id": unit.id,
                    "name": unit.name,
                    "filtered": false
                }));
                setUnitFilter(updateUnitFilter);
                updateLanguageFilter = languageFilter.map(language => ({
                    "id": language.id,
                    "name": language.name,
                    "filtered": false
                }));
                setLanguageFilter(updateLanguageFilter);
                updateMemberFilter = memberFilter.map(member => ({
                    "id": member.id,
                    "name": member.name,
                    "filtered": false
                }));
                setMemberFilter(updateMemberFilter);
                return;
        }
    };

    /**
     * Set up language filter controls
     */
    /* let languageFilterDefaults = languages.map(language => ({
        "id": language.id,
        "name": language.name,
        "filtered": false
    }));
    const [languageFilter, setLanguageFilter] = useState(languageFilterDefaults); */
    let unfilteredAlbumCount = albums.length;
    let unfilteredSongCount = songs.length;
    let filteredReleaseTypes = releaseTypeFilter.filter(releaseType => releaseType.filtered === true).map(releaseType => releaseType.id);
    let filteredUnits = unitFilter.filter(unit => unit.filtered === true).map(unit => unit.id);
    let filteredLanguages = languageFilter.filter(language => language.filtered === true).map(language => language.id);
    let filteredMembers = memberFilter.filter(member => member.filtered === true).map(member => member.id);


    /**
     * Filter songs
     */
    if (hasUnitQuery) {
        songs = songs.filter(song =>
            song.artists.filter(artist => artist.id === currentUnit.id).length > 0);
    }
    if (hasMemberQuery) {
        songs = songs.filter(song =>
            song.performing_artists.filter(performing_artist => performing_artist.member.id === currentMember.id).length > 0);
    }
    if (duplicateTracksFilter) {
        songs = songs.filter(song => song.duplicate === false);
    }
    if (filteredReleaseTypes.length > 0) {
        albums = albums.filter(album => filteredReleaseTypes.includes(album.release_type.id));
    }
    if (filteredUnits.length > 0) {
        songs = songs.filter(song => song.artists.filter(artist =>
            filteredUnits.includes(artist.unit)
        ).length > 0
        );
    }
    if (filteredLanguages.length > 0) {
        songs = songs.filter(song => filteredLanguages.every(languageId =>
            song.languages.map(language => language.id).indexOf(languageId) !== -1
        ));
    }
    if (filteredMembers.length > 0) {
        songs = songs.filter(song => filteredMembers.every(memberId =>
            song.performing_artists.map(performingArtist => performingArtist.member.id).indexOf(memberId) !== -1
        ));
    }

    /**
     * Generate miscellaneous and meta tag variables
     */
    let albumCount = albums.filter(album => songs.filter(song => song.album.id === album.id).length > 0).length;
    let songCount = songs.filter(song => albums.filter(album => album.id === song.album.id).length > 0).length;
    const metaFormattedName = (!hasUnitQuery && !hasMemberQuery) ? 'NCT '
        : (hasUnitQuery ? currentUnit.name + ' ' : '') + (hasMemberQuery ? currentMember.name + ' ' : '');
    const metaUrl = 'https://www.nctdiscography.com/' + (hasUnitQuery ? currentUnit.slug + '/' : '') + (hasMemberQuery ? currentMember.slug + '/' : '');


    return (
        <>
            <MetaTags
                pageTitle={type === 1 ? `Full Discography` : `Other Releases`}
                metaFormattedName={metaFormattedName}
                metaUrl={metaUrl}
                albumCount={albumCount}
                songCount={songCount}
            />

            <div className="lg:hidden w-full px-4 py-8 fixed bottom-0 bg-gradient-to-t from-light">
                <div className="container mx-auto flex flex-nowrap justify-end">
                    <Switch.Group>
                        <Switch
                            checked={filterMenuVisibility}
                            onChange={setFilterMenuVisibility}>
                        </Switch>
                        <Switch.Label className="bg-nctu rounded-full px-3 py-2 ml-1 cursor-pointer shadow">
                            <FilterIcon className="" strokeWidth={2} size={16} />
                        </Switch.Label>
                    </Switch.Group>
                </div>
            </div>
            <div className={`lg:hidden flex flex-row flex-nowrap fixed top-0 right-0 z-30 ${!filterMenuVisibility && `translate-x-full`
                } transform transition duration-300 ease-in-out`}>
                <div className={`w-80 shadow-lg text-sm`}>
                    <FilterMenu
                        type="mobile"
                        releaseTypeFilterOnChange={releaseTypeFilterOnChange}
                        unitFilterOnChange={unitFilterOnChange}
                        languageFilterOnChange={languageFilterOnChange}
                        memberFilterOnChange={memberFilterOnChange}
                        clearFilter={clearFilter}
                        albumCount={albumCount}
                        songCount={songCount}
                    />
                </div>
            </div>

            <FilterHeader
                clearFilter={clearFilter}
                albumCount={albumCount}
                songCount={songCount}
            />

            <div className="w-full px-2 py-1 mt-2 lg:px-10">
                <div className="container mx-auto">
                    <div className="hidden lg:block lg:w-80 2xl:w-96 sticky top-0 float-right">
                        <FilterMenu
                            type="desktop"
                            releaseTypeFilterOnChange={releaseTypeFilterOnChange}
                            unitFilterOnChange={unitFilterOnChange}
                            languageFilterOnChange={languageFilterOnChange}
                            memberFilterOnChange={memberFilterOnChange}
                            clearFilter={clearFilter}
                            albumCount={albumCount}
                            songCount={songCount}
                        />
                    </div>
                    <main className="lg:mr-80 2xl:mr-96">
                        <div className="flex flex-col px-1 py-2 lg:px-3">
                            {
                                songCount > 0
                                    ? albums.map(album => {
                                        return (
                                            songs.filter(song => song.album.id === album.id).length > 0
                                            && <Album
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
                                                songs={songs.filter(song => song.album.id === album.id)}
                                                languages={album.languages}
                                                links={album.links}
                                                filteredLanguages={filteredLanguages}
                                            />
                                        )
                                    })
                                    : <div className="container w-full">
                                        <p className="text-center">No results found</p>
                                    </div>
                            }
                        </div>
                    </main>
                </div>

            </div>

        </>
    )
}

export default Discography;