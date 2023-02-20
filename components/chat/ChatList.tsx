import { signOut, useSession } from 'next-auth/react';
import ChatItem from './ChatItem';
import { logOutUser } from '@/helpers';

import Button from '../button/Button';
import SearchUser from './searchUser/SearchUser';

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

			<div className='customScroll grow overflow-y-auto px-2'>
				<ul>
					<li>
						<ChatItem userName='Dominic' />
					</li>

					<li>
						<ChatItem
							userName='Max'
							lastMessage='Some last loooong message Some last loooong message Some last loooong message'
						/>
					</li>
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
