import { signOut, useSession } from 'next-auth/react';
import ChatItem from './ChatItem';
import { getRealTimeDataFromCollection, logOutUser } from '@/helpers';

import Button from '../button/Button';
import SearchUser from './searchUser/SearchUser';
import { useEffect, useState } from 'react';

let content: JSX.Element;

interface ChatsInterface {
	id: string;
	name: string;
	lastMessage: string;
}

const ChatList = () => {
	console.log('ChatList');
	const [chats, setChats] = useState<ChatsInterface[]>();

	const { data } = useSession();
	const user = data?.user;
	const image = user?.image || '/person-icon.png';

	const logOutUserHandler = async () => {
		try {
			await logOutUser();
			await signOut();
		} catch (err) {
			console.log(err);
		}
	};

	const transformData = (data: any) => {
		if (!data.activeChats) return;

		const arr = [];

		for (const key in data.activeChats) {
			arr.push({
				id: data.activeChats[key].userData.id as string,
				name: data.activeChats[key].userData.name as string,
				lastMessage: data.activeChats[key].lastMessage as string,
			});
		}

		setChats(arr);
	};

	useEffect(() => {
		if (!user?.uid) return;

		const unsub = getRealTimeDataFromCollection(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			user.uid,
			transformData
		);

		return () => {
			unsub();
		};
	}, [user?.uid]);

	if (chats) {
		console.log(chats);

		content = (
			<ul>
				{chats.map((chat) => (
					<li key={chat.id}>
						<ChatItem
							id={chat.id}
							userName={chat.name}
							lastMessage={chat.lastMessage}
						/>
					</li>
				))}
			</ul>
		);
	}

	return (
		<div className='flex min-w-[350px] max-w-[350px] grow flex-col'>
			<div className='flex justify-between p-4'>
				<h1 className='text-xl font-semibold tracking-wider'>My Chats</h1>
				<div className='details flex items-center gap-x-2'>
					<div className='image'>
						<img
							src={image}
							alt={`${user?.name} picture`}
							className='h-6 w-6 rounded-full'
						/>
					</div>
					<span className='max-w-[150px] truncate'>{user?.name || 'User'}</span>
				</div>
			</div>

			<SearchUser />

			<div className='customScroll grow overflow-y-auto px-2 pt-2'>
				{content}
			</div>

			<div className='flex items-end justify-between p-4'>
				<Button
					text='+ New Chat'
					style='px-4 py-2 transition-colors hover:bg-teal-500'
				/>

				<Button
					text='Log out'
					style='px-4 py-2 text-sm transition-colors hover:bg-teal-500'
					onClickHandler={logOutUserHandler}
				/>
			</div>
		</div>
	);
};

export default ChatList;
