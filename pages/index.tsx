import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

interface Props {
	name: string | undefined;
}

const Home = ({ name }: Props) => {
	return (
		<h1 className='text-center text-2xl text-slate-50'>{`Hello ${
			name ? name : 'user'
		}!`}</h1>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(context.req, context.res, authOptions);

	console.log('Log from server side main page', session);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: { name: session.user?.name },
	};
};

export default Home;
