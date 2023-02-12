import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
	title?: string;
}

const AuthForm = ({ title }: Props) => {
	const { pathname } = useRouter();
	const isLogInRoute = pathname.slice(1) === 'login';

	return (
		<section className='fade-in-from-bottom w-[280px] rounded-md bg-slate-300/80 p-5 sm:w-[310px]'>
			<h2 className='ml-[50%] inline-block -translate-x-1/2 border-b-2 border-indigo-500 px-2 text-center text-xl font-semibold'>
				{title}
			</h2>
			<form className='py-6'>
				<div className='mb-4 flex flex-col   text-center'>
					<label htmlFor='user-email' className='mb-2'>
						Email
					</label>
					<input
						type='email'
						id='user-email'
						placeholder='mail@mail.com'
						className='rounded-md px-4 py-2 outline-indigo-500'
						required
					/>
					<p className='error-msg basis-full text-center font-semibold text-red-600'>
						{/* Email is not correct */}
					</p>
				</div>

				<div className='mb-4 flex flex-col   text-center'>
					<label htmlFor='user-password' className='mb-2'>
						Password
					</label>
					<input
						type='password'
						id='user-password'
						placeholder='********'
						className='rounded-md px-4 py-2 outline-indigo-500'
						required
					/>
					<p className='error-msg basis-full text-center font-semibold text-red-600'>
						{/* Password is not correct */}
					</p>
				</div>

				<button className='ml-auto mt-4 block rounded-md bg-slate-200 px-4 py-2 outline-indigo-500 transition-colors duration-300 hover:bg-slate-50 focus:scale-95'>
					{title}
				</button>
			</form>
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
	);
};

export default AuthForm;
