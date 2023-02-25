import Chat from './Chat';
import ChatList from './ChatList';
import Head from 'next/head';
import Section from '../UI/section/Section';

const ChatApp = () => {
	return (
		<>
			<Head>
				<title>Chat App</title>
			</Head>
			<Section>
				<ChatList />
				<Chat />
			</Section>
		</>
	);
};

export default ChatApp;
