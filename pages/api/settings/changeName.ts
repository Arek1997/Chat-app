// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
	getDataFromCollection,
	setDataToCollection,
	updateCollectionData,
	updateUser,
} from '@/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return;

	const { reqBody: updatedName } = req.body as { reqBody: string };

	if (updatedName.trim().length < 3) {
		return res.status(403).json({
			status: 'error',
			errorMessage: `Name have to be at least 3 characters`,
		});
	}

	const data = await getServerSession(req, res, authOptions);

	try {
		const userData = await getDataFromCollection(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			data?.user.uid!
		);

		const activeChats = userData.data()?.activeChats;

		for (const key in activeChats) {
			const sharedId = key;
			const id = activeChats[key].userData.id;

			await updateCollectionData(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
				id,
				{
					[`activeChats.${sharedId}.userData.name`]: updatedName,
				}
			);
		}

		for (const key in activeChats) {
			const sharedId = key;
			const chatCollection = await getDataFromCollection(
				process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_CHATS!,
				sharedId
			);

			const allMessagesArr = chatCollection.data()?.messages;

			const updatedMessages = allMessagesArr.map((message: any) => {
				if (message.senderData.id === data?.user.uid!) {
					const updatedMessage = { ...message };
					updatedMessage.senderData.name = updatedName;
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

		await updateUser(updatedName);

		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USERS!,
			data?.user.uid!,
			{ name: updatedName }
		);

		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			data?.user.uid!,
			{ [`owner.name`]: updatedName }
		);

		console.log('Success');
		res.status(200).json({
			status: 'success',
			message: 'Name has been changed',
			newName: updatedName,
		});
	} catch (err: any) {
		console.log(err.message);
		res.status(500).json({ status: 'error', errorMessage: err.message });
	}
}
