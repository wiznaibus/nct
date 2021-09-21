import { useContext } from 'react';
import { FilterMembersStateContext } from './FilterMembers'
import Link from 'next/link'
import { Youtube } from 'react-feather'

const Track = ({
    albumId,
    id,
    trackNumber,
    title,
    slug,
    artists,
    albumMembers,
    trackMembers,
    languages,
    links,
}) => {
    const { filtered } = useContext(FilterMembersStateContext);

    const filteredMembers = [];
    albumMembers.forEach(albumMember => {
        let trackMember = trackMembers.find(trackMember => trackMember.member === albumMember.id);
        filteredMembers.push(
            <span key={`album-${albumId}-track-${id}-member-${albumMember.id}`}
                className={`text-xs font-normal rounded-full px-2 pt-1 pb-0.5 ${ trackMember
                    ? `bg-${trackMember.artist.primary_color} text-${trackMember.artist.secondary_color}` 
                    : filtered ? "hidden" 
                    : "bg-gray-100" } `}>
                {albumMember.name}
            </span>
        );
        return filteredMembers;
    });

    return (
        <>
            <tr className="border-b border-gray-200">
                <td className="px-1.5 pt-1.5 pb-2">
                    {trackNumber}
                </td>
                <td className="px-1.5 pt-1.5 pb-2">
                    {title}
                    {links && links.map(link => (
                    <div key={`song-${id}-link-${link.id}`} className="inline-block ml-1">
                        <Link className="" href={link.url} passHref={true}>
                            <a target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-gray-700"><Youtube /></a>
                        </Link>
                    </div>
                ))}
                </td>
                <td className="px-1.5 pt-1.5 pb-2">
                    {artists.map(artist => (artist.name)).join(', ')}
                </td>
                <td className="px-1.5 pt-1.5 pb-2">
                    {languages.map(language => (language.name)).join(', ')}
                </td>
                <td className="hidden lg:table-cell px-1.5 pt-1.5 pb-2">
                    <div className="flex flex-wrap justify-between gap-1">
                        {filteredMembers}
                    </div>
                </td>
            </tr>
            <tr className="lg:hidden">
                <td colSpan="5" className="px-1.5 pt-1.5 pb-2 border-b-2 border-gray-300">
                    <div className="flex flex-wrap justify-between gap-1">
                        {filteredMembers}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Track;