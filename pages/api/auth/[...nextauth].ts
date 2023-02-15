import { logUser } from '@/helpers';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			async authorize(credentials, req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				try {
					const { user } = await logUser(email, password);
					return { email: user.email, name: user.displayName };
				} catch (err) {
					console.log(err);
					throw new Error('Email or password are incorrect.');
				}
			},
		}),
	],
};
export default NextAuth(authOptions);
