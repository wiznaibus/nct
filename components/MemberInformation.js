import Link from 'next/link'

const MemberInformation = ({ member, unit, matchingAlbumCount, matchingTrackCount }) => {
    return (
        <>
            <div className="flex flex-nowrap gap-x-3 mb-5">
                <img className="h-20 w-20 p-px border border-black" src={`/${member.profile_url}`} alt="The 7th Sense Album Cover" />
                <div className="w-full grid grid-cols-2 justify-items-stretch gap-x-2">
                    <div>
                        <p className="border-b text-xs text-gray-600">Name</p>
                        <p className="">{member.name}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">{unit ? "Unit" : "Units"}</p>
                        <p className="flex flex-wrap gap-1 py-1">
                            { unit 
                                ? <span className={`text-sm px-2 py-0.5 rounded-full bg-${unit.color} text-${unit.text}`}>{unit.name}</span> 
                                : member.units.map(unit => 
                                    <span key={`member-units-${unit.slug}`} className={`text-sm px-2 py-0.5 rounded-full bg-${unit.color} text-${unit.text}`}>{unit.name}</span>
                                )
                            }
                        </p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Participating Albums</p>
                        <p className="">{matchingAlbumCount}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Participating Tracks</p>
                        <p className="">{matchingTrackCount}</p>
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