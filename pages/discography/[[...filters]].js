
import { useRouter } from 'next/router'
import { useState } from 'react'

import DiscographyHeader from "../../components/DiscographyHeader";
import Album from "../../components/Album"

function Discography({ units, filterableUnits, filterableMembers, albums }) {
    const router = useRouter();

    /**
     * Find current unit and member based on router queries
     */
    let currentUnit;
    let currentMember;
    if (router.query.filters) {
        if (router.query.filters.length > 1) {
            currentUnit = filterableUnits.find(unit => unit.slug === router.query.filters[0]);
            currentMember = filterableMembers.find(member => member.slug === router.query.filters[1]);
        } else {
            if (filterableUnits.filter(unit => unit.slug === router.query.filters[0]).length > 0) {
                currentUnit = filterableUnits.find(unit => unit.slug === router.query.filters[0]);
            } else {
                currentMember = filterableMembers.find(member => member.slug === router.query.filters[0]);
            }
        }
    }


    /**
     * Filtering list of available units/members based on the current filter values.
     * 
     * This will move to getStaticProps() once the site has a proper API.
     */
    const filteredUnits = currentMember 
        ? currentMember.units.map(memberUnit => (filterableUnits.find(unit => (unit.slug === memberUnit.slug)))) 
        : filterableUnits;
    const filteredMembers = currentUnit 
        ? currentUnit.members.map(unitMember => (filterableMembers.find(member => (member.slug === unitMember.slug)))) 
        : filterableMembers;

        
    /**
     * Filter the album results to show only albums and tracks that match the current filter
     */
    let filteredAlbums = albums.filter(album => (
        currentUnit && currentMember ? album.tracks.filter(track =>
            track.artist.includes(currentUnit.name) && track.participating_members.includes(currentMember.name)).length > 0
            : currentUnit ? album.artist.includes(currentUnit.name)
                : currentMember ? album.participating_members.includes(currentMember.name)
                    : true
    ));
    filteredAlbums = filteredAlbums.map(album => ({
        name: album.name,
        cover_url: album.cover_url,
        release_date: album.release_date,
        type: album.type,
        artist: album.artist,
        language: album.language,
        links: album.links,
        participating_members: album.participating_members,
        tracks: album.tracks.filter(track => (
            currentUnit && currentMember ? track.artist.includes(currentUnit.name) && track.participating_members.includes(currentMember.name)
                : currentUnit ? track.artist.includes(currentUnit.name)
                    : currentMember ? track.participating_members.includes(currentMember.name)
                        : true
        ))
    })
    );


    /**
     * Get the number of albums and tracks for the current filter
     */

    let matchingAlbumCount = filteredAlbums.length;
    let matchingTrackCount = 0;
    filteredAlbums.forEach(album => {
        matchingTrackCount += album.tracks.length;
    });

    //console.log("currentUnit: " + (currentUnit && currentUnit.name));
    //console.log("currentMember: " + (currentMember && currentMember.units.map(unit => (unit.name))));
    //console.log("filterableUnits: " + filterableUnits.map(unit => (unit.name)));
    //console.log("filterableMembers: " + filterableMembers.map(member => (member.name)));
    //console.log("filteredUnits: " + filteredUnits.map(unit => (unit.name)));
    //console.log("filteredMembers: " + filteredMembers.map(member => (member.name)));

    return (
        <>
            <DiscographyHeader
                units={filteredUnits}
                members={filteredMembers}
                currentUnit={currentUnit}
                currentMember={currentMember}
                matchingAlbumCount={matchingAlbumCount}
                matchingTrackCount={matchingTrackCount} />

            <main className="px-2 py-1 mt-2 lg:px-10">
                <div className="container mx-auto px-1 py-2 lg:px-3">
                    {filteredAlbums.map(album => (
                        <Album
                            id={album.name}
                            key={`album-${album.name}`}
                            name={album.name}
                            releaseDate={album.release_date}
                            type={album.type}
                            links={album.links}
                            cover={album.cover_url}
                            members={album.participating_members}
                            tracks={album.tracks}
                            units={units}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}

export async function getStaticPaths() {
    const data = await import("/data.json");
    const paths = [];
    paths.push({ params: { filters: [] } });

    //generate paths for members
    data.members.map(member => (paths.push({ params: { filters: [member.slug] } })));

    //generate paths for units
    data.filterableUnits.map(unit => {
        paths.push({ params: { filters: [unit.slug] } });
        unit.members.map(member => (paths.push({ params: { filters: [unit.slug, member.slug] } })));
    });

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps() {
    const data = await import("/data.json");

    return {
        props: {
            units: data.units,
            albums: data.albums,
            filterableUnits: data.filterableUnits,
            filterableMembers: data.filterableMembers
        },
    }
}

export default Discography;
