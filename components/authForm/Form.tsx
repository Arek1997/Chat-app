import { registerUser } from '@/helpers';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
	name?: string;
	email: string;
	password: string;
}

interface Response {
	status: 'success' | 'error';
	message: string;
}

interface Props {
	title: string;
	isLogInRoute: boolean;
}

const Form = ({ title, isLogInRoute }: Props) => {
	const [responseMessage, setResponseMessage] = useState<Response | null>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful, isSubmitting },
	} = useForm<Inputs>({
		mode: 'onTouched',
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmitHandler: SubmitHandler<Inputs> = async ({
		name,
		email,
		password,
	}) => {
		if (isLogInRoute) {
			signIn('credentials', { email, password, callbackUrl: '/' });
		} else {
			try {
				const { res, data } = await registerUser('/api/auth/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password }),
				});

				if (!res.ok) {
					const errorMessage = data.errorMessage;
					throw new Error(errorMessage);
				}

				setResponseMessage({ status: 'success', message: 'Account created.' });
			} catch (err: any) {
				console.log(err.message);
				setResponseMessage({ status: 'error', message: err.message });
			}
		}
	};

	useEffect(() => {
		reset({
			name: '',
			email: '',
			password: '',
		});

		if (responseMessage?.status === 'success') {
			const timeout = setTimeout(() => {
				setResponseMessage(null);
			}, 2000);

			return () => clearTimeout(timeout);
		}
	}, [isSubmitSuccessful]);

	const responseColor =
		responseMessage?.status === 'success' ? 'text-green-700' : 'text-red-700';

	return (
		<form className='py-6' onSubmit={handleSubmit(onSubmitHandler)}>
			{responseMessage && (
				<span
					className={`mb-6 block text-center font-semibold ${responseColor}`}
				>
					{responseMessage?.message}
				</span>
			)}
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
						{...register('name', {
							required: 'Name is required',
							minLength: 3,
							pattern: {
								message: 'Name have to be at least 3 characters',
								value: /[A-Za-z]{3}/,
							},
						})}
					/>
					<p className='error-msg basis-full text-center font-semibold text-red-600'>
						{errors.name?.message}
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
					{...register('email', {
						required: 'Email is required',
						pattern: {
							message: 'Email is not correct',
							value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
						},
					})}
				/>
				<p className='error-msg basis-full text-center font-semibold text-red-600'>
					{errors.email?.message}
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
					{...register('password', {
						required: 'Password is required',
						pattern: {
							message:
								'Password have to contains at least 8 sign, at least one uppercase letter, at least one downcase letter, at least one number and at least one special sign',
							value:
								/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gm,
						},
					})}
				/>
				<p className='error-msg basis-full text-center font-semibold text-red-600'>
					{errors.password?.message}
				</p>
			</div>

			<button className='ml-auto mt-4 block rounded-md bg-slate-200 px-4 py-2 outline-indigo-500 transition-colors duration-300 hover:bg-slate-50 focus:scale-95'>
				{isSubmitting ? 'Processing...' : title}
			</button>
		</form>
	);
};

export default Form;
