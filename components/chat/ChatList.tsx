import { signOut, useSession } from 'next-auth/react';
import ChatItem from './ChatItem';
import { logOutUser } from '@/helpers';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase.config';
import { useEffect } from 'react';

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
		<div className='flex max-w-[350px] grow flex-col'>
			<div className='flex justify-between bg-cyan-900 p-4'>
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
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
					<li>
						<ChatItem />
					</li>
				</ul>
			</div>

			<div className='flex items-end justify-between bg-cyan-900 p-4'>
				<button className='rounded-full bg-teal-600 py-2 px-4 transition-colors hover:bg-teal-500'>
					+ New Chat
				</button>
				<button
					className='rounded-full bg-teal-600 px-4 py-2 text-sm transition-colors hover:bg-teal-500'
					onClick={logOutUserHandler}
				>
					Log out
				</button>
			</div>
		</div>
	);
};

export default ChatList;
