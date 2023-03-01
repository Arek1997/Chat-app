// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { auth } from '@/firebase.config';
import { fetchData, validPassword } from '@/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return;

	const { reqBody: updatedPassword } = req.body as { reqBody: string };

	if (!validPassword(updatedPassword)) {
		return res.status(403).json({
			status: 'error',
			errorMessage: `Password is not correct`,
		});
	}

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
					password: updatedPassword,
					returnSecureToken: true,
				}),
			}
		);

		if (!resFromFetch.ok) {
			const { message: errorMessage } = dataFromFetch.error;
			throw new Error(errorMessage);
		}

		console.log('Success');
		res.status(200).json({
			status: 'success',
			message: 'Password has been changed',
		});
	} catch (err: any) {
		console.log(err.message);
		res.status(500).json({ status: 'error', errorMessage: err.message });
	}
}
