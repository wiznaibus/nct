import Link from 'next/link'

const Header = () => {
    return (
        <div className="mx-auto w-full bg-nctu bg-opacity-30 pt-2 pb-1 py-1">
            <div className="container mx-auto flex px-2 py-2 lg:flex-nowrap lg:px-3">
                <Link href="/discography">
                    <a className="hover:underline">
                        <h1 className="title text-black font-medium text-4xl lg:px-3">nct discography</h1>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Header;