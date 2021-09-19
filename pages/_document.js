import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body className="flex flex-col h-screen font-light bg-light text-gray-800">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument