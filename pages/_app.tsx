import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from '@next/font/google';

import '@/styles/globals.css';
import ChatContextProvider from '@/context/ChatContext';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	return (
		<SessionProvider session={session}>
			<ChatContextProvider>
				<main className={poppins.className}>
					<Component {...pageProps} />
				</main>
			</ChatContextProvider>
		</SessionProvider>
	);
};

export default App;
