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

				console.log('Log from ...nextauth', credentials);

				if (email === 'test@test.com' && password === '123456') {
					return { email };
				} else {
					return null;
				}
			},
		}),
	],
};
export default NextAuth(authOptions);
