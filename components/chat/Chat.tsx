import { useSelectChat } from '@/context/ChatContext';
import MessagesList from './message/messagesList/MessagesList';
import SendMessage from './sendMessage/SendMessage';

const Chat = () => {
	console.log('Chat');

	const selectedChat = useSelectChat();

	if (!selectedChat?.chatData) {
		return (
			<p className='grid grow place-content-center'>
				Select user and start conversation.
			</p>
		);
	}

	return (
		<div className='flex grow flex-col text-center'>
			<div className='relative p-4'>
				<h2 className='text-xl font-semibold'>
					{selectedChat?.chatData?.selectedUserName ?? 'User Name'}
				</h2>
				<span
					className='absolute top-1/2 right-7 -translate-y-1/2 cursor-pointer text-xl hover:opacity-80'
					title='Close chat'
					aria-label='Close chat'
					onClick={() => selectedChat.updateSelectedChat(null)}
				>
					✖
				</span>
			</div>
			<MessagesList />
			<SendMessage />
		</div>
	);
};

export default Chat;
