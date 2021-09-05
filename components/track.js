import { useContext } from 'react';
import { FilterMembersStateContext } from '../components/FilterMembers'

const Track = ({ number, title, artist, artistColor, language, trackMembers, albumMembers, currentMember }) => {
    const { filtered } = useContext(FilterMembersStateContext);

    const filteredMembers = [];
    albumMembers.forEach(member => {
        filteredMembers.push(
            <span key={member}
                className={`text-xs font-semibold rounded-full px-2 pt-1 pb-0.5
                    ${title === `Switch (feat. SR15B)` && member === `Doyoung` 
                    ? `bg-nctu text-black`
                    : trackMembers.includes(member) ? `bg-${artistColor.color} text-${artistColor.text}`
                        : filtered ? "hidden" : "bg-gray-100" 
                    }
                `}>
                {member}
            </span>
        );
        return filteredMembers;
    });
    
    return (
        <>
            <tr key={number} className="border-b border-gray-200">
                <td className="px-1.5 pt-1.5 pb-2">
                    {number}
                </td>
                <td className="px-1.5 pt-1.5 pb-2">
                    {title}
                </td>
                <td className="px-1.5 pt-1.5 pb-2">
                    {artist}
                    {/* {artist.join(', ')} */}
                </td>
                <td className="px-1.5 pt-1.5 pb-2">
                    {language.join(', ')}
                </td>
                <td className="hidden lg:table-cell px-1.5 pt-1.5 pb-2">
                    <div className="flex flex-wrap justify-between gap-1">
                        {filteredMembers}
                    </div>
                </td>
            </tr>
            <tr className="lg:hidden">
                <td colSpan="4" className="px-1.5 pt-1.5 pb-2 border-b-2 border-gray-300">
                    <div className="flex flex-wrap justify-between gap-1">
                        {filteredMembers}
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Track;