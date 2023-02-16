import Chat from './Chat';
import ChatList from './ChatList';

interface Props {}

const ChatApp = ({}: Props) => {
	return (
		<section className='fade-in-from-bottom flex h-[600px] w-[1200px] overflow-hidden rounded-lg bg-cyan-700 text-slate-100'>
			<ChatList />
			<Chat />
		</section>
	);
};

export default ChatApp;
