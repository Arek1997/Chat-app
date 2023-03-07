interface Props {
	owner: boolean;
	message?: string;
	image?: string;
	userName?: string;
	userImage?: string;
}

const Message = ({ message, owner, userImage, userName, image }: Props) => {
	return (
		<li className={`message ${owner ? 'message-owner' : ''} max-w-[80%]`}>
			<article className='flex items-end gap-x-3 '>
				<img
					src={userImage || '/person-icon.png'}
					alt={userName || 'User Name'}
					className='h-6 w-6 rounded-full object-cover'
				/>

				<div>
					{message && (
						<p className='rounded-lg bg-slate-100/20 p-3 text-left'>
							{message}
						</p>
					)}

					{image && <img src={image} className='mt-4' />}
				</div>
			</article>
		</li>
	);
};

export default Message;
