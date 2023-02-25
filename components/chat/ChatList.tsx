import { signOut, useSession } from 'next-auth/react';
import ChatItem from './ChatItem';
import { getRealTimeDataFromCollection, logOutUser } from '@/helpers';

import Button from '../button/Button';
import SearchUser from './searchUser/SearchUser';
import { useEffect, useState } from 'react';
import { useToggle } from '@/context/ToggleContext';

let content: JSX.Element;

interface ChatsInterface {
	id: string;
	name: string;
	lastMessage: string;
}

const ChatList = () => {
	const {
		state: { chatListOpen },
	} = useToggle();
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
				date: data.activeChats[key].date as Date,
			});
		}

		setChats(arr.sort((a, b) => +b.date - +a.date));
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

	if (!chats) {
		content = <p className='text-center'>Add your first user and start talk</p>;
	}

	if (chats) {
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
		<div className={`h-full flex-col ${chatListOpen ? 'flex' : 'hidden'}`}>
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
					<span className='max-w-[120px] truncate'>{user?.name || 'User'}</span>
					<a
						href='/settings'
						className='ml-3 transition-transform hover:rotate-45'
					>
						<img
							src='/settings.png'
							alt='Settings'
							className='h-6 w-6 invert'
						/>
					</a>
				</div>
			</div>

			<SearchUser />

			<div className='customScroll min-h-[150px] grow overflow-y-auto px-2 pt-2'>
				{content}
			</div>

			<div className='flex items-end justify-end p-4'>
				<Button
					text='+ New Chat'
					style='px-4 py-2 transition-colors enabled:hover:bg-teal-500 hidden'
					disabled={true}
					title='This button is temporarily disabled, until implement creating "+ New Chat" function.'
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
