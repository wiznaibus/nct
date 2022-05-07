import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body className="overflow-x-hidden overscroll-contain font-light bg-light dark:bg-gray-700 text-gray-800 dark:text-light">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument