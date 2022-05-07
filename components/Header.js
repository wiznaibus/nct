import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
    return (
        <header className="mx-auto w-full text-black dark:text-white bg-nctu dark:bg-nct127 pb-1 py-1">
            <div className="px-3 sm:px-2 py-2 lg:pt-4 lg:px-10">
                <div className="container mx-auto flex flex-row flex-nowrap justify-between items-center">
                    <nav className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-start lg:items-baseline px-1 lg:px-2">
                        <Link href="/">
                            <a className="title font-medium text-2xl lowercase sm:text-4xl lg:px-3 hover:underline">NCT Discography</a>
                        </Link>
                        <div className="flex flex-row gap-3 font-normal text-base sm:text-xl">
                            <Link href="/discography">
                                <a className="hover:underline">Discography</a>
                            </Link>
                            <Link href="/other">
                                <a className="hover:underline">Other Releases</a>
                            </Link>
                            <Link href="/about">
                                <a className="hover:underline">About</a>
                            </Link>
                        </div>
                    </nav>
                    <div className="">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;