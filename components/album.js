import Link from 'next/link'
import Track from "./Track";

const Album = ({ id, name, releaseDate, type, links, cover, members, tracks, units, currentMember }) => {

    return (
        <div key={id} className="container mx-auto lg:px-3 mb-10 lg:mb-12 lg:pt-6">
            <div className="flex flex-nowrap items-start justify-between mb-6">
                <div className="flex flex-col">
                    <h2 className="title text-black font-medium text-3xl mb-2">{name}</h2>
                    <p>Release Date: {releaseDate}</p>
                    <p>Type: {type}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {links && links.map((link) => (
                            <Link key={`link-${link.url}`} href={link.url} passHref={true}>
                                <a target="_blank" className="text-sm px-2 py-1.5 rounded-full border border-nctu hover:bg-nctu">
                                    {link.type}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <img className="h-24 w-24 p-px border border-black" src={`/${cover}`} alt="The 7th Sense Album Cover" />
            </div>
            <table className="table-fixed w-full">
                <thead className="text-xs text-gray-600 text-left border-b border-gray-400">
                    <tr>
                        <th className="font-light p-1 w-5 lg:w-8">#</th>
                        <th className="font-light p-1 w-max lg:w-max">Track</th>
                        <th className="font-light p-1 w-1/4 lg:w-24 xl:w-32">Artist</th>
                        <th className="font-light p-1 w-1/4 lg:w-28 xl:w-36">Language</th>
                        <th className="font-light hidden lg:table-cell p-1 lg:w-1/2">Participating Members</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map((track) => (
                        (!currentMember || (track.participating_members.includes(currentMember))) &&
                        <Track
                            id={`${id}-${track.number}`}
                            key={`track-${id}-${track.number}`}
                            number={track.number}
                            title={track.name}
                            artist={track.artist}
                            artistColor={units.find(unit => unit.name === track.artist)}
                            language={track.language}
                            links={track.links}
                            trackMembers={track.participating_members}
                            albumMembers={members} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Album;