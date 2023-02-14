// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createNewUser, validEmail, validPassword } from '@/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return;

	const { email, password } = req.body;

	if (!validEmail(email)) {
		return res.status(403).json({
			status: 'error',
			errorMessage: `Given email: ${email} is invalid.`,
		});
	}

	if (!validPassword(password)) {
		return res.status(403).json({
			status: 'error',
			errorMessage: `Password too easy.`,
		});
	}

	try {
		const { user } = await createNewUser(email, password);

		console.log('Success');
		res.status(200).json({
			status: 'success',
			message: 'Account created.',
			email: user.email,
		});
	} catch (err: any) {
		console.log(err.message);
		res.status(500).json({ status: 'error', errorMessage: err.message });
	}
}
