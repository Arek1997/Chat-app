import { fetchData } from '@/helpers';
import useResponseMessage from '@/hooks/useResponseMessage';
import useToggle from '@/hooks/useToggle';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';

interface Inputs {
	name?: string;
	email: string;
	password: string;
}

interface Props {
	title: string;
	isLogInRoute: boolean;
	setIsLoading: (value: boolean) => void;
}

const Form = ({ title, isLogInRoute, setIsLoading }: Props) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		watch,
		getValues,
		formState: { errors, isSubmitting, isSubmitSuccessful, isSubmitted },
	} = useForm<Inputs>({
		mode: 'onTouched',
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const { message, response, setResponse } = useResponseMessage({
		style: 'mb-6',
		colors: { success: 'text-green-700', error: 'text-red-700' },
	});

	const watchPassword = watch('password');

	const { value, toggleHandler } = useToggle({ values: ['password', 'text'] });

	const onSubmitHandler: SubmitHandler<Inputs> = async ({
		name,
		email,
		password,
	}) => {
		if (isLogInRoute) {
			try {
				const result = await signIn('credentials', {
					redirect: false,
					email,
					password,
				});

				if (!result?.ok) {
					throw new Error(result?.error);
				}

				router.push('/');
			} catch (err: any) {
				setResponse({ status: 'error', message: err.message });
			}
		} else {
			try {
				const { res, data } = await fetchData('/api/auth/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password, name }),
				});

				if (!res.ok) {
					const { errorMessage } = data;
					throw new Error(errorMessage);
				}

				setResponse({ status: data.status, message: data.message });
			} catch (err: any) {
				console.log(err.message);
				setResponse({ status: 'error', message: err.message });
			}
		}
	};

	useEffect(() => {
		setIsLoading(isSubmitting);
	}, [isSubmitting]);

	useEffect(() => {
		if (!isLogInRoute && isSubmitted && response?.status === 'success') {
			console.log('isSubmitted', isSubmitted);
			console.log('response', response?.status === 'success');

			const { email, password } = getValues();
			signIn('credentials', {
				redirect: false,
				email,
				password,
			})
				.then(() => {
					router.push('/');
				})
				.catch((err) => {
					setResponse({ status: 'error', message: err.message });
				});
		}

		reset({
			name: '',
			email: '',
			password: '',
		});
	}, [isSubmitSuccessful]);

	return (
		<form className='w-full py-6' onSubmit={handleSubmit(onSubmitHandler)}>
			{response && message}

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
					<ErrorMessage message={errors.name?.message} style='text-red-600' />
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
				<ErrorMessage message={errors.email?.message} style='text-red-600' />
			</div>

			<div className='mb-4 flex flex-col text-center'>
				<label htmlFor='user-password' className='mb-2'>
					Password
				</label>
				<div className='relative'>
					<input
						type={value}
						id='user-password'
						placeholder='********'
						className='w-full rounded-md px-4 py-2 outline-indigo-500'
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

					{watchPassword && (
						<span
							className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
							onClick={toggleHandler}
						>
							<img
								src={`/eye-${value === 'password' ? '1' : '2'}.png`}
								alt='Eye icon'
							/>
						</span>
					)}
				</div>
				<ErrorMessage message={errors.password?.message} style='text-red-600' />
			</div>

			<button className='ml-auto mt-4 block rounded-md bg-slate-200 px-4 py-2 outline-indigo-500 transition-colors duration-300 hover:bg-slate-50 focus:scale-95'>
				{isSubmitting ? 'Processing...' : title}
			</button>
		</form>
	);
};

export default Form;
