import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel='icon' type='image/ico' href='/favicon.ico' />
					<link
						href='https://fonts.googleapis.com/css2?family=Cute+Font&family=Roboto&family=Teko&display=swap'
						rel='stylesheet'/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
