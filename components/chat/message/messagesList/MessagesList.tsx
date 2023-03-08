import { useSelectChat } from '@/context/ChatContext';
import { getRealTimeDataFromCollection } from '@/helpers';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import Message from '../Message';

interface MessageINterface {
	id: string;
	message?: string;
	image?: string;
	senderData: {
		email: string;
		id: string;
		image: string;
		name: string;
	};
}

const MessagesList = () => {
	const { data } = useSession();
	const [messages, setMessages] = useState<MessageINterface[]>();

	const scrollToRef = useRef<HTMLDivElement>(null);

	const selectChat = useSelectChat();

	const callBack = (data: any | Function) => setMessages(data.messages);

	useEffect(() => {
		const timeout = setTimeout(() => {
			scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, 200);

		return () => clearTimeout(timeout);
	}, [messages]);

	useEffect(() => {
		if (!selectChat?.chatData?.chatId) return;

		const unsub = getRealTimeDataFromCollection(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
			selectChat?.chatData?.chatId!,
			callBack
		);

		return () => unsub();
	}, [selectChat?.chatData?.chatId]);

	return (
		<div className='hiddenScroll min-h-[150px] grow overflow-y-auto px-4'>
			{messages?.length ? (
				<ul className='flex flex-col gap-y-4'>
					{messages?.map((msg) => {
						const isOwner = msg.senderData.id === data?.user.uid;
						return (
							<Message
								key={msg.id}
								owner={isOwner}
								message={msg.message}
								image={msg.image}
								userName={msg.senderData.name}
								userImage={msg.senderData.image}
							/>
						);
					})}
					<div className='scrollTo' ref={scrollToRef}></div>
				</ul>
			) : (
				<p>
					You have not any message with {selectChat?.chatData?.selectedUserName}
				</p>
			)}
		</div>
	);
};

export default MessagesList;
