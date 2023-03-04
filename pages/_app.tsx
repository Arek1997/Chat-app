import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from '@next/font/google';

import '@/styles/globals.css';
import ChatContextProvider from '@/context/ChatContext';
import ToggleContextProvider from '@/context/ToggleContext';
import ProcessingContextProvider from '@/context/ProcessingContext';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	return (
		<SessionProvider session={session}>
			<ProcessingContextProvider>
				<ChatContextProvider>
					<ToggleContextProvider>
						<main className={poppins.className}>
							<Component {...pageProps} />
						</main>
					</ToggleContextProvider>
				</ChatContextProvider>
			</ProcessingContextProvider>
		</SessionProvider>
	);
};

export default App;
