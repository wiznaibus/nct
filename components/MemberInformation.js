import Link from 'next/link'

const MemberInformation = ({ member, hasUnit, unit, albumCount, songCount }) => {
    /**
     * Filter and sort member's units
     */
    let units = member.performing_artists.map(member => ({
        id: member.artist.unit.id,
        slug: member.artist.unit.slug,
        name: member.artist.unit.name,
        discography_types: member.artist.unit.discography_types,
        primary_color: member.artist.unit.primary_color,
        secondary_color: member.artist.unit.secondary_color
    }));
    units = units.reduce((unique, o) => {
        if(!unique.some(obj => obj.id === o.id)) {
          unique.push(o);
        }
        return unique;
    },[]);
    units = units.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

    return (
        <>
            <div className="flex flex-nowrap gap-x-3 mb-5">
                <img className="h-20 w-20 p-px border border-black" src={`https://assets.nctdiscography.com/${member.cover_image.formats.thumbnail.hash 
                + member.cover_image.formats.thumbnail.ext}`} alt={`${member.name} profile image`} />
                <div className="w-full grid grid-cols-2 justify-items-stretch gap-x-2">
                    <div>
                        <p className="border-b text-xs text-gray-600">Name</p>
                        <p className="">{member.name}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">{hasUnit ? "Unit" : "Units"}</p>
                        <p className="flex flex-wrap gap-1 py-1">
                            { hasUnit 
                                ? <span className={`text-sm px-2 py-0.5 rounded-full bg-${unit.primary_color} text-${unit.secondary_color}`}>{unit.name}</span> 
                                : units.map(eachUnit =>  (
                                    eachUnit.discography_types.filter(type => type.id === 1).length === 1 && 
                                    <span key={`member-units-${eachUnit.slug}`} className={`text-sm px-2 py-0.5 rounded-full bg-${eachUnit.primary_color} text-${eachUnit.secondary_color}`}>{eachUnit.name}</span>
                                ))
                            }
                        </p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Participating Albums</p>
                        <p className="">{albumCount}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Participating Tracks</p>
                        <p className="">{songCount}</p>
                    </div>
                </div>
            </div>

            {/* <div className="flex justify-center">
                <Link href=""><a className="title text-black text-lg font-medium bg-nctu rounded-full pt-1.5 px-3 py-1">View Profile</a></Link>
            </div> */}
        </>
    );
}

export default MemberInformation;