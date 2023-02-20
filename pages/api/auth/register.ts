// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
	createNewUser,
	saveUserInFireStoreUsersColl,
	updateUser,
	validEmail,
	validPassword,
} from '@/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

interface reqBody {
	email: string;
	password: string;
	name: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return;

	const { email, password, name }: reqBody = req.body;

	if (name.trim().length < 3) {
		return res.status(403).json({
			status: 'error',
			errorMessage: `Name have to be at least 3 characters`,
		});
	}

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

		await updateUser(name);

		await saveUserInFireStoreUsersColl(user.uid, {
			id: user.uid,
			email,
			name: user.displayName!,
		});

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
