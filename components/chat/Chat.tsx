import { useSelectChat } from '@/context/ChatContext';
import { useToggle } from '@/context/ToggleContext';
import Close from '../UI/close/Close';
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
				<Close
					style='right-7 text-xl hover:opacity-80'
					onClick={() => {
						selectedChat?.updateSelectedChat(null);
						toggleHandler();
					}}
				/>
			</div>
			<MessagesList />
			<SendMessage />
		</div>
	);
};

export default Chat;
