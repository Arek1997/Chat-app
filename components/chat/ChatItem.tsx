interface Props {
	userName: string;
	userImage?: string;
	lastMessage?: string;
}

const ChatItem = ({ userName, userImage, lastMessage }: Props) => {
	const image = userImage || '/person-icon.png';

	return (
		<article className='flex cursor-pointer items-center rounded-lg p-2 hover:bg-slate-400/80'>
			<img
				src={image}
				alt={`${userName} image`}
				className='mr-4 h-14 w-14 rounded-full object-cover'
			/>

			<div className='max-w-[220px] grow'>
				<h3 className='truncate font-semibold'>{userName}</h3>
				{lastMessage && <p className=' truncate text-xs'>{lastMessage}</p>}
			</div>
		</article>
	);
};

export default ChatItem;
