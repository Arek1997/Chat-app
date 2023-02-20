interface Props {
	message: string;
	user?: string;
	image?: string;
}

const Message = ({ message, image, user }: Props) => {
	const userImage = image || '/person-icon.png';
	const userName = user || 'User Name';

	return (
		<li className='message max-w-[80%]'>
			<article className='flex items-end gap-x-3 '>
				<img src={userImage} alt={userName} className='h-6 w-6 rounded-full' />
				<p className='rounded-lg bg-slate-100/20 p-3 text-left'>{message}</p>
			</article>
		</li>
	);
};

export default Message;
