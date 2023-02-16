import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from '@next/font/google';

import '@/styles/globals.css';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	return (
		<SessionProvider session={session}>
			<main className={poppins.className}>
				<Component {...pageProps} />
			</main>
		</SessionProvider>
	);
};

export default App;
