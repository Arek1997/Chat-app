import Chat from './Chat';
import ChatList from './ChatList';
import Head from 'next/head';

const ChatApp = () => {
	return (
		<>
			<Head>
				<title>Chat App</title>
			</Head>
			<section className='customScroll fade-in-from-bottom h-screen overflow-y-auto overflow-x-hidden bg-cyan-700 text-slate-100 sm:mx-auto sm:max-h-[600px] sm:max-w-[350px] sm:rounded-lg'>
				<ChatList />
				<Chat />
			</section>
		</>
	);
};

export default ChatApp;
