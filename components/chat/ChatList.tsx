import { signOut, useSession } from 'next-auth/react';
import ChatItem from './ChatItem';
import { logOutUser } from '@/helpers';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { useEffect } from 'react';
import Button from '../button/Button';

const ChatList = () => {
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

	useEffect(() => {
		if (!user?.uid!) return;

		const unsub = onSnapshot(
			doc(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_NAME!, user?.uid!),
			(doc) => {
				console.log('Current data: ', doc.data());
			}
		);

		return () => {
			unsub();
		};
	}, [user?.uid]);

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
			<div className='customScroll grow overflow-y-auto px-2'>
				<ul>
					<ChatItem />

					<ChatItem />

					<ChatItem />

					<ChatItem />
				</ul>
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
