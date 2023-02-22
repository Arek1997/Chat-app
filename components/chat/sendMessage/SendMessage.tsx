import Button from '@/components/button/Button';
import { useSelectChat } from '@/context/ChatContext';
import { updateCollectionData } from '@/helpers';
import { arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';

const SendMessage = () => {
	console.log('SendMessage');
	const { data } = useSession();
	const selectedChat = useSelectChat();
	const messageRef = useRef<HTMLTextAreaElement>(null);

	const updateCollection = async (id: string) => {
		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			id,
			{
				[`activeChats.${selectedChat?.chatData?.chatId}.lastMessage`]:
					messageRef.current?.value,
				[`activeChats.${selectedChat?.chatData?.chatId}.date`]:
					serverTimestamp(),
			}
		);
	};

	const sendMessageHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		if (messageRef.current?.value.trim().length === 0) {
			return alert('Write some message.');
		}

		const dataMessage = {
			message: messageRef.current?.value,
			id: crypto.randomUUID(),
			date: Timestamp.now(),
			senderData: {
				id: data?.user.uid,
				name: data?.user.name,
				email: data?.user.email,
			},
		};

		try {
			await updateCollectionData(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
				selectedChat?.chatData?.chatId!,
				{
					messages: arrayUnion(dataMessage),
				}
			);

			await updateCollection(selectedChat?.chatData?.selectedUserId!);

			await updateCollection(data?.user.uid!);

			messageRef.current!.value = '';
		} catch (err) {
			console.log(err);
			alert('Some issue occurred, try later.');
		}
	};

	return (
		<div className='p-4'>
			<form className='flex items-center' onSubmit={sendMessageHandler}>
				<div className='grow'>
					<label htmlFor='message'></label>
					<textarea
						ref={messageRef}
						onFocus={(e) => {
							e.target.animate(
								[{ minHeight: '60px' }, { minHeight: '100px' }],
								{
									duration: 300,
									iterations: 1,
									easing: 'ease',
									fill: 'forwards',
								}
							);
						}}
						onBlur={(e) => {
							e.target.animate(
								[{ minHeight: '100px' }, { minHeight: '60px' }],
								{
									duration: 300,
									iterations: 1,
									easing: 'ease',
									fill: 'forwards',
								}
							);
						}}
						name='message'
						id='message'
						aria-placeholder='Write a message...'
						placeholder='Write a message...'
						className='textAreaMessage w-full resize-none rounded-lg bg-transparent px-4 py-2 outline-none transition-colors placeholder:text-slate-200/80 hover:bg-slate-200/20 focus:bg-slate-200/20'
					/>
				</div>
				<div className='mx-4'>
					<label
						htmlFor='files'
						className='cursor-pointer transition-opacity hover:opacity-80'
						aria-label='Add file'
						title='Add file'
						aria-haspopup
					>
						<img
							src='/paperclip.png'
							alt='paperclip'
							className='w-6 rotate-45'
						/>
					</label>
					<input
						type='file'
						name='files'
						id='files'
						className='hidden'
						aria-hidden
					/>
				</div>

				<Button
					style='p-3 transition-opacity hover:opacity-80'
					title='Send message'
				>
					<img src='/sendIcon.png' alt='sendIcon' className='h-6 w-6' />
				</Button>
			</form>
		</div>
	);
};

export default SendMessage;
