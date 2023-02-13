import { useRef } from 'react';
import { signIn } from 'next-auth/react';

interface Props {
	title: string;
	isLogInRoute: boolean;
}

const Form = ({ title, isLogInRoute }: Props) => {
	const inputNameRef = useRef<HTMLInputElement>(null);
	const inputEmailRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const name = inputNameRef.current?.value.trim();
		const email = inputEmailRef.current?.value.trim();
		const password = inputPasswordRef.current?.value.trim();

		console.log(name, email, password);

		if (isLogInRoute) {
			signIn('credentials', { email, password, callbackUrl: '/' });
		} else {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();
			console.log(data);
		}
	};

	return (
		<form className='py-6' onSubmit={onSubmitHandler}>
			{!isLogInRoute && (
				<div className='mb-4 flex flex-col text-center'>
					<label htmlFor='user-name' className='mb-2'>
						Full Name
					</label>
					<input
						type='text'
						id='user-name'
						placeholder='Adam Małysz'
						className='rounded-md px-4 py-2 outline-indigo-500'
						required
						minLength={3}
						ref={inputNameRef}
					/>
					<p className='error-msg basis-full text-center font-semibold text-red-600'>
						{/* Name is too short. Min 3 signs */}
					</p>
				</div>
			)}

			<div className='mb-4 flex flex-col text-center'>
				<label htmlFor='user-email' className='mb-2'>
					Email
				</label>
				<input
					type='email'
					id='user-email'
					placeholder='mail@mail.com'
					className='rounded-md px-4 py-2 outline-indigo-500'
					required
					ref={inputEmailRef}
				/>
				<p className='error-msg basis-full text-center font-semibold text-red-600'>
					{/* Email is not correct */}
				</p>
			</div>

			<div className='mb-4 flex flex-col text-center'>
				<label htmlFor='user-password' className='mb-2'>
					Password
				</label>
				<input
					type='password'
					id='user-password'
					placeholder='********'
					className='rounded-md px-4 py-2 outline-indigo-500'
					required
					ref={inputPasswordRef}
				/>
				<p className='error-msg basis-full text-center font-semibold text-red-600'>
					{/* Password is not correct */}
				</p>
			</div>

			<button className='ml-auto mt-4 block rounded-md bg-slate-200 px-4 py-2 outline-indigo-500 transition-colors duration-300 hover:bg-slate-50 focus:scale-95'>
				{title}
			</button>
		</form>
	);
};

export default Form;
