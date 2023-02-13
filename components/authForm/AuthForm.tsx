import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Form from './Form';

interface Props {
	title: string;
}

const AuthForm = ({ title }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const { pathname } = useRouter();
	const isLogInRoute = pathname.slice(1) === 'login';

	return (
		<>
			<section className='fade-in-from-bottom relative w-[280px] overflow-hidden rounded-md bg-slate-300/80 p-5 sm:w-[310px]'>
				{isLoading && <LoadingSpinner />}
				<h2 className='ml-[50%] inline-block -translate-x-1/2 border-b-2 border-indigo-500 px-2 text-center text-xl font-semibold'>
					{title}
				</h2>
				<Form
					title={title}
					isLogInRoute={isLogInRoute}
					setIsLoading={setIsLoading}
				/>
				<p className='inline-block border-b-2 border-indigo-500 px-2'>
					{isLogInRoute ? 'Have not account?' : 'Have account?'}
					<Link
						className='pl-3 transition-opacity hover:opacity-80'
						href={isLogInRoute ? '/register' : '/login'}
					>
						{isLogInRoute ? 'Register' : 'Log in'}
					</Link>
				</p>
			</section>
		</>
	);
};

export default AuthForm;
