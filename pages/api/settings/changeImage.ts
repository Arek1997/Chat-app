// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { storage } from '@/firebase.config';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import {
	getDataFromCollection,
	setDataToCollection,
	updateCollectionData,
	updateUser,
} from '@/helpers';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { MAX_IMAGE_SIZE_IN_MB } from '@/helpers/variables';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: `${MAX_IMAGE_SIZE_IN_MB}mb`,
		},
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return;

	const data = await getServerSession(req, res, authOptions);

	const { reqBody: ImageData } = req.body as { reqBody: string };

	const storageRef = ref(storage, data?.user.uid);

	try {
		const snapshot = await uploadString(storageRef, ImageData, 'data_url');

		const imageUrl = await getDownloadURL(snapshot.ref);

		await updateUser(data?.user.name!, imageUrl);

		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USERS!,
			data?.user.uid!,
			{
				image: imageUrl,
			}
		);

		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			data?.user.uid!,
			{
				[`owner.image`]: imageUrl,
			}
		);

		const userData = await getDataFromCollection(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			data?.user.uid!
		);
		const activeChats = userData.data()?.activeChats;

		for (const sharedId in activeChats) {
			const id = activeChats[sharedId].userData.id;

			await updateCollectionData(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
				id,
				{
					[`activeChats.${sharedId}.userData.image`]: imageUrl,
				}
			);
		}

		for (const sharedId in activeChats) {
			const chatCollection = await getDataFromCollection(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
				sharedId
			);

			const allMessagesArr = chatCollection.data()?.messages;

			const updatedMessages = allMessagesArr.map((message: any) => {
				if (message.senderData.id === data?.user.uid!) {
					const updatedMessage = { ...message };
					updatedMessage.senderData.image = imageUrl;
					return updatedMessage;
				} else {
					return message;
				}
			});

			await setDataToCollection(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
				sharedId,
				{
					messages: updatedMessages,
				}
			);
		}

		console.log('Success');
		res.status(200).json({
			status: 'success',
			message: 'Image has been changed',
		});
	} catch (err: any) {
		console.log(err);
		res.status(500).json({
			status: 'error',
			errorMessage: 'Something went wrong, try later',
		});
	}
}
