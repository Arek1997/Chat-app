import { signOut, useSession } from 'next-auth/react';
import ChatItem from './ChatItem';
import { signOutUser } from '@/helpers';

const ChatList = () => {
	const { data } = useSession();
	const user = data?.user;
	const image = user?.image || '/person-icon.png';

	const logOutUserHandler = async () => {
		try {
			await signOutUser();
			await signOut();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='flex max-w-[350px] grow flex-col border-r-2'>
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
			<div className='scrollbar scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-gray-100 max-h-[450px] overflow-y-auto px-2'>
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

			<div className='flex grow items-end justify-between bg-cyan-900 p-4'>
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
