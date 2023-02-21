import {
	getDataFromCollection,
	setDataToCollection,
	updateCollectionData,
} from '@/helpers';
import { serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';

interface Props {
	id?: string;
	userName: string;
	userImage?: string;
	lastMessage?: string;
	onClear?: () => void;
}

const ChatItem = ({ id, userName, userImage, lastMessage, onClear }: Props) => {
	const { data } = useSession();

	const image = userImage || '/person-icon.png';

	const selectHandler = async () => {
		const sharedId =
			id! > data?.user.uid! ? id! + data?.user.uid : data?.user.uid + id!;

		try {
			const collectionData = await getDataFromCollection(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
				sharedId
			);

			if (!collectionData.exists()) {
				console.log('Konwersacja nie istnieje');

				await setDataToCollection(
					process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
					sharedId,
					{ messages: [] }
				);

				await updateCollectionData(
					process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
					data?.user.uid!,
					{
						['activeChats' + '.' + sharedId + '.userData']: {
							id,
							name: userName,
						},
						['activeChats' + '.' + sharedId + '.date']: serverTimestamp(),
					}
				);

				await updateCollectionData(
					process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
					id!,
					{
						['activeChats' + '.' + sharedId + '.userData']: {
							id: data?.user.uid,
							name: data?.user.name,
						},
						['activeChats' + '.' + sharedId + '.date']: serverTimestamp(),
					}
				);
			} else {
				console.log('Konwersacja istnieje');
			}

			onClear && onClear();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<article
			className='flex cursor-pointer items-center rounded-lg p-2 hover:bg-slate-400/80'
			onClick={selectHandler}
		>
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
