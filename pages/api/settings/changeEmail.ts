// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { auth } from '@/firebase.config';
import {
	fetchData,
	getDataFromCollection,
	setDataToCollection,
	updateCollectionData,
	validEmail,
} from '@/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return;

	const { reqBody: updatedEmail } = req.body as { reqBody: string };

	if (!validEmail(updatedEmail)) {
		return res.status(403).json({
			status: 'error',
			errorMessage: `Email is not correct`,
		});
	}

	const data = await getServerSession(req, res, authOptions);
	const userToken = await auth.currentUser?.getIdToken();

	try {
		const { res: resFromFetch, data: dataFromFetch } = await fetchData(
			`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					idToken: userToken,
					email: updatedEmail,
					returnSecureToken: true,
				}),
			}
		);

		if (!resFromFetch.ok) {
			const { message: errorMessage } = dataFromFetch.error;
			throw new Error(errorMessage);
		}

		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USERS!,
			data?.user.uid!,
			{ email: updatedEmail }
		);

		await updateCollectionData(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			data?.user.uid!,
			{ [`owner.email`]: updatedEmail }
		);

		const userData = await getDataFromCollection(
			process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
			data?.user.uid!
		);

		const activeChats = userData.data()?.activeChats;

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
					updatedMessage.senderData.email = updatedEmail;
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
			message: 'Email has been changed',
			newEmail: updatedEmail,
		});
	} catch (err: any) {
		console.log(err.message);
		res.status(500).json({ status: 'error', errorMessage: err.message });
	}
}
