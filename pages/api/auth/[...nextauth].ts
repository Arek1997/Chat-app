import { logUserToFirebase } from '@/helpers';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		maxAge: 60 * 60,
	},

	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};

				try {
					const { user } = await logUserToFirebase(email, password);

					return {
						email: user.email,
						name: user.displayName,
						uid: user.uid,
						image: user.photoURL,
					};
				} catch (err) {
					console.log(err);
					throw new Error('Email or password are incorrect.');
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.uid = user.uid;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.uid = token.uid as string;
			}
			return session;
		},
	},
};
export default NextAuth(authOptions);
