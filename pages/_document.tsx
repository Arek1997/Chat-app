import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body className='animated-background grid h-screen place-content-center overflow-x-hidden'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
