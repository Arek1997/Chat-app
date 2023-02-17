import { useSession } from 'next-auth/react';

const ChatItem = () => {
	const { data } = useSession();
	const user = data?.user;
	const image = user?.image || '/person-icon.png';

	return (
		<article className='flex cursor-pointer items-center rounded-lg p-2 hover:bg-slate-400/80'>
			<img
				src={image}
				alt='user image'
				className='mr-4 h-14 w-14 rounded-full'
			/>

			<div className='max-w-[220px] grow'>
				<h3 className='truncate font-semibold'>User Name</h3>
				<p className=' truncate text-xs'>
					Some very loooong message Some very loooong message
				</p>
			</div>
		</article>
	);
};

export default ChatItem;
