import Link from 'next/link'

const UnitInformation = ({ unit, matchingAlbumCount, matchingTrackCount }) => {
    return (
        <>
            <div className="flex flex-nowrap gap-x-3 mb-5">
                <img className="h-20 w-20 p-px border border-black" src={`/${unit.cover_url}`} alt="The 7th Sense Album Cover" />
                <div className="w-full grid grid-cols-2 justify-items-stretch gap-x-2">
                    <div className="col-span-2">
                        <p className="border-b text-xs text-gray-600">Name</p>
                        <p className="">{unit.name}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Albums</p>
                        <p className="">{matchingAlbumCount}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Tracks</p>
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

export default UnitInformation;