import Link from 'next/link';

const Construction = () => {
    return (
        <>
            <div className="flex flex-row flex-nowrap justify-center align-middle">
                <div className="flex flex-row flex-nowrap bg-nctdream mb-2 lg:mb-0 p-1 gap-x-1">
                    <img className="h-12 w-12 p-px bg-white border border-black" src="https://assets.nctdiscography.com/thumbnail_haechanpeek_180633a969.png" alt="Haechan peeking through curtains" />
                    <div className="text-black p-1 text-sm">
                        <strong>This area is under construction!</strong><br />Music is being added over time. Please report any mistakes <Link href="https://github.com/wiznaibus/nct/issues" passHref={true}><a className="text-nct127 underline hover:text-gray-700" target="_blank">here</a></Link>.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Construction;