import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="pb-12 bottom-0 text-center">
            <p className="text-sm">
                Made with love 💚 by <Link href="https://twitter.com/wiznaibus" passHref={true}>
                    <a target="_blank" rel="noreferrer noopener" className="text-nct127 dark:text-nctu underline hover:text-gray-700 dark:hover:text-white">wiznaibus</a>
                </Link>
            </p>
        </footer>
    );
}

export default Footer;