// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { registerUser } from '@/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return;

	const { email, password } = req.body;

	try {
		const { res: fetchRes, data } = await registerUser(
			`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password, returnSecureToken: true }),
			}
		);

		if (!fetchRes.ok) {
			console.log('Response ERROR');
			const errorMessage = data.error.message;
			throw new Error(errorMessage);
		}

		console.log('Success');
		res
			.status(200)
			.json({ status: 'success', message: 'Account created.', email });
	} catch (err: any) {
		console.log(err.message);
		res.status(500).json({ status: 'error', errorMessage: err.message });
	}
}
