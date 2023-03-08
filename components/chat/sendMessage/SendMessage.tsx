import Button from '@/components/UI/button/Button';
import { useSelectChat } from '@/context/ChatContext';
import { storage } from '@/firebase.config';
import { updateCollectionData, checkFormat } from '@/helpers';
import { AVAILABLE_IMAGE_FORMATS } from '@/helpers/variables';
import { arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Input {
	message: string;
	file: FileList;
}

const SendMessage = () => {
	const { data } = useSession();
	const selectedChat = useSelectChat();
	const [image, setImage] = useState<File>();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { isSubmitSuccessful },
	} = useForm<Input>({
		mode: 'onTouched',
		defaultValues: {
			message: '',
			file: undefined,
		},
	});

	const updateCollection = async (id: string) => {
		const message = getValues('message').trim();

		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			id,
			{
				[`activeChats.${selectedChat?.chatData?.chatId}.lastMessage`]: message
					? message
					: image
					? 'image'
					: '',
				[`activeChats.${selectedChat?.chatData?.chatId}.date`]:
					serverTimestamp(),
			}
		);
	};

	const sendMessageHandler: SubmitHandler<Input> = async ({ message }) => {
		if (!message.trim() && !image) {
			return alert('Write some message.');
		}

		const dataMessage = {
			message: message.trim(),
			image: '',
			id: crypto.randomUUID(),
			date: Timestamp.now(),
			senderData: {
				id: data?.user.uid,
				name: data?.user.name,
				email: data?.user.email,
				image: data?.user.image,
			},
		};

		try {
			if (image) {
				const storageRef = ref(
					storage,
					`messageImage/${data?.user.uid}/${image.name}`
				);
				await uploadBytes(storageRef, image);
				const imageURL = await getDownloadURL(storageRef);
				dataMessage.image = imageURL;
			}

			await updateCollectionData(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
				selectedChat?.chatData?.chatId!,
				{
					messages: arrayUnion(dataMessage),
				}
			);

			await updateCollection(selectedChat?.chatData?.selectedUserId!);

			await updateCollection(data?.user.uid!);
		} catch (err) {
			console.log(err);
			alert('Some issue occurred, try later.');
		}
	};

	useEffect(() => {
		setImage(undefined);
		reset({
			message: '',
			file: undefined,
		});
	}, [isSubmitSuccessful]);

	return (
		<div className='p-4'>
			{image && <img src={URL.createObjectURL(image)} alt='Selected image' />}
			<form
				className='flex items-center'
				onSubmit={handleSubmit(sendMessageHandler)}
			>
				<div className='grow'>
					<label htmlFor='message'></label>
					<textarea
						{...register('message')}
						onFocus={(e) => {
							e.target.animate(
								[{ minHeight: '60px' }, { minHeight: '100px' }],
								{
									duration: 300,
									iterations: 1,
									easing: 'ease',
									fill: 'forwards',
								}
							);
						}}
						onBlur={(e) => {
							e.target.animate(
								[{ minHeight: '100px' }, { minHeight: '60px' }],
								{
									duration: 300,
									iterations: 1,
									easing: 'ease',
									fill: 'forwards',
								}
							);
						}}
						name='message'
						id='message'
						aria-placeholder='Write a message...'
						placeholder='Write a message...'
						className='hiddenScroll w-full resize-none rounded-lg bg-transparent px-4 py-2 outline-none transition-colors placeholder:text-slate-200/80 hover:bg-slate-200/20 focus:bg-slate-200/20'
					/>
				</div>
				<div className='mx-4'>
					<label
						htmlFor='files'
						className='cursor-pointer transition-opacity hover:opacity-80'
						aria-label='Add file'
						title='Add file'
						aria-haspopup
					>
						<img
							src='/paperclip.png'
							alt='paperclip'
							className='w-6 rotate-45'
						/>
					</label>
					<input
						type='file'
						accept={AVAILABLE_IMAGE_FORMATS.map(
							(format) => `image/${format}`
						).join(', ')}
						id='files'
						className='hidden'
						aria-hidden
						{...register('file', {
							onChange: (e) => {
								setImage(undefined);
								const file = e.target.files?.[0] as File;
								if (file) {
									checkFormat(file, 'image', AVAILABLE_IMAGE_FORMATS)
										? setImage(file)
										: alert(
												`Only images with ${AVAILABLE_IMAGE_FORMATS.join(
													', '
												)} format are available.`
										  );
								}
							},
						})}
					/>
				</div>

				<Button
					style='p-3 transition-opacity hover:opacity-80'
					title='Send message'
				>
					<img src='/sendIcon.png' alt='sendIcon' className='h-6 w-6' />
				</Button>
			</form>
		</div>
	);
};

export default SendMessage;
