import { useSelectChat } from '@/context/ChatContext';
import { useToggle } from '@/context/ToggleContext';
import MessagesList from './message/messagesList/MessagesList';
import SendMessage from './sendMessage/SendMessage';

const Chat = () => {
	const {
		state: { chatOpen },
		toggleHandler,
	} = useToggle();
	const selectedChat = useSelectChat();

	return (
		<div
			className={`h-full flex-col text-center ${chatOpen ? 'flex' : 'hidden'}`}
		>
			<div className='relative p-4'>
				<h2 className='text-xl font-semibold'>
					{selectedChat?.chatData?.selectedUserName ?? 'User Name'}
				</h2>
				<span
					className='absolute top-1/2 right-7 -translate-y-1/2 cursor-pointer text-xl hover:opacity-80'
					title='Close chat'
					aria-label='Close chat'
					onClick={() => {
						selectedChat?.updateSelectedChat(null);
						toggleHandler();
					}}
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
