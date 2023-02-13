import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import AuthForm from '@/components/authForm/AuthForm';
import { authOptions } from '../api/auth/[...nextauth]';

const LogInPage = () => {
	return <AuthForm title='Log in' />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context.req, context.res, authOptions);

	console.log('Log from server side login page', session);

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default LogInPage;
