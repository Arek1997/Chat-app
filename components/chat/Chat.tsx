import { useSelectChat } from '@/context/ChatContext';
import MessagesList from './message/messagesList/MessagesList';
import SendMessage from './sendMessage/SendMessage';

const Chat = () => {
	console.log('Chat');

	const selectedChat = useSelectChat();

	if (!selectedChat?.chatData) return;

	return (
		<div className='flex grow flex-col text-center'>
			<div className='p-4'>
				<h2 className='text-xl font-semibold'>
					{selectedChat?.chatData?.selectedUserName ?? 'User Name'}
				</h2>
			</div>
			<MessagesList />
			<SendMessage />
		</div>
	);
};

export default Chat;
