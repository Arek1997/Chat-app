import Settings from '@/components/settings/Settings';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';

const SettingsPage = () => {
	return (
		<>
			<Head>
				<title>Settings</title>
			</Head>
			<Settings />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context.req, context.res, authOptions);

	console.log('Log from server side Settings page', session);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default SettingsPage;
