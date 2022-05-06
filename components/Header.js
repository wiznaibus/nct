import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
    return (
        <div className="mx-auto w-full text-black dark:text-white bg-nctu dark:bg-nct127 pb-1 py-1">
            <div className="px-3 sm:px-2 py-2 lg:pt-4 lg:px-10">
                <div className="container mx-auto flex flex-row flex-nowrap justify-between items-center">
                    <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-start lg:items-baseline px-1 lg:px-2">
                        <Link href="/">
                            <a className="hover:underline">
                                <h1 className="title font-medium text-2xl lowercase sm:text-4xl lg:px-3">NCT Discography</h1>
                            </a>
                        </Link>
                        <div className="flex flex-row gap-2 font-normal text-base sm:text-xl">
                            {/* <div className="flex flex-nowrap items-center">
                            <h1 className="text-black pr-1">Profiles</h1>
                            <span className="bg-black text-white text-xs rounded-full px-1 py-0.5 mr-2">Soon!</span>
                        </div> */}
                            <Link href="/discography">
                                <a className="hover:underline">
                                    <h1 className="pr-1">Discography</h1>
                                </a>
                            </Link>
                            <Link href="/other">
                                <a className="hover:underline">
                                    <h1 className="pr-1">Other Releases</h1>
                                </a>
                            </Link>
                            {/* <div className="flex flex-nowrap items-center">
                            <h1 className="hover:underline text-black px-1">Other Releases</h1>
                            <span className="bg-nctdream text-black shadow text-xs rounded-full px-1 py-0.5 mr-2">Soon!</span>
                        </div> */}
                            <Link href="/about">
                                <a className="hover:underline">
                                    <h1 className="pr-1">About</h1>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;