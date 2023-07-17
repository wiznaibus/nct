import Link from 'next/link'
import Track from './Track';
import { useContext } from 'react';
import { FilterDuplicateTracksStateContext } from './Filter/FilterDuplicateTracks';

const Album = ({
    id,
    title,
    slug,
    releaseDate,
    releaseType,
    coverImage,
    artists,
    members,
    songs,
    languages,
    links
}) => {

    const { duplicateTracksFilter } = useContext(FilterDuplicateTracksStateContext);

    /**
     * Filter and sort participating members
     */
     let participatingMembers = members.map(member => ({
        id: member.member.id,
        slug: member.member.slug,
        name: member.member.name
    }));
    participatingMembers = participatingMembers.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
    },[]);
    participatingMembers = participatingMembers.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

    /**
     * Sort arrays
     */
    artists = artists.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    languages = languages.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    songs = songs.sort((a,b) => (a.track_number > b.track_number) ? 1 : ((b.track_number > a.track_number) ? -1 : 0));
    links = links.sort((a,b) => (a.link_type.id > b.link_type.id) ? 1 : ((b.link_type.id > a.link_type.id) ? -1 : 0));

    /**
     * Set image for missing covers
     */
     coverImage = coverImage 
     ? `https://assets.nctdiscography.com/${coverImage.formats.thumbnail.hash + coverImage.formats.thumbnail.ext}` 
     : `https://assets.nctdiscography.com/thumbnail_990638d681.png`

    return (
        <section className="container mx-auto mb-10 lg:mb-12 lg:pt-6">
            <div className="flex flex-nowrap items-start justify-between mb-6">
                <div className="flex flex-col">
                    <h2 className="title text-black dark:text-white font-medium text-3xl mb-2">{title}</h2>
                    <p>Release Date: {releaseDate.replace(/-/g, '/')}</p>
                    <p>Type: {releaseType.name}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {links && links.map((link) => (
                            <Link key={`album-${id}-link-${link.id}`} href={link.url} passHref={true}>
                                <a target="_blank" rel="noopener noreferrer" className="text-sm px-2 py-1.5 rounded-full border border-nctu hover:bg-nctu dark:border-nct127 dark:hover:bg-nct127">
                                    {link.link_type.name}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <img className="h-24 w-24 p-px dark:bg-black border border-black dark:border-white" src={coverImage} alt={`${title} album cover`} />
            </div>
            <table className="table-fixed w-full">
                <thead className="text-xs text-gray-600 dark:text-gray-300 text-left border-b border-gray-400 dark:border-black">
                    <tr className="w-full">
                        <th className="font-light p-1 w-5 xl:w-6">#</th>
                        <th className="font-light p-1 w-1/2 xl:w-auto">Track</th>
                        <th className="font-light p-1 w-1/4 xl:w-28 2xl:w-32">Artist</th>
                        <th className="font-light p-1 w-1/4 xl:w-24 2xl:w-28">Language</th>
                        <th className="font-light p-1 hidden xl:table-cell xl:w-5/12 2xl:w-1/2">Participating Members</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => {
                        return (
                             <Track
                                key={`album-${id}-song-${song.id}`}
                                albumId={id}
                                id={song.id}
                                trackNumber={song.track_number}
                                isTitle={song.title_track}
                                title={song.title}
                                slug={song.slug}
                                artists={song.artists}
                                albumMembers={participatingMembers}
                                trackMembers={song.performing_artists}
                                languages={song.languages}
                                links={song.links}
                            />
                        )
                    })}
                </tbody>
            </table>
        </section>
    );
};

export default Album;