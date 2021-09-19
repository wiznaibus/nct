import Link from 'next/link'

const UnitInformation = ({ unit, albumCount, songCount }) => {
    let cover_image = unit.cover_image 
        ? `https://assets.nctdiscography.com/${unit.cover_image.formats.thumbnail.hash + unit.cover_image.formats.thumbnail.ext}` 
        : `https://assets.nctdiscography.com/thumbnail_nct_4e154c4e2f.png`
    return (
        <>
            <div className="flex flex-nowrap gap-x-3 mb-5">
                <img className="h-20 w-20 p-px border border-black" src={cover_image} alt={`${unit.name} profile image`} />
                <div className="w-full grid grid-cols-2 justify-items-stretch gap-x-2">
                    <div className="col-span-2">
                        <p className="border-b text-xs text-gray-600">Name</p>
                        <p className="">{unit.name}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Albums</p>
                        <p className="">{albumCount}</p>
                    </div>
                    <div>
                        <p className="border-b text-xs text-gray-600">Tracks</p>
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

export default UnitInformation;