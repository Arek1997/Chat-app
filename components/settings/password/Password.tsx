import Button from '@/components/UI/button/Button';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import PasswordRequirements from '@/components/UI/passwordRequirements/PasswordRequirements';
import { useProcessing } from '@/context/ProcessingContext';
import { handleDataChange } from '@/helpers';
import { PASSWORD_REG_EXP } from '@/helpers/variables';
import useToggle from '@/hooks/useToggle';
import { Response } from '@/interface';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
	setResponse: (data: Response) => void;
}

interface Input {
	password: string;
}

const Password = ({ setResponse }: Props) => {
	const [isTouched, setIsTouched] = useState(false);
	const { setProcessing } = useProcessing();
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Input>({
		mode: 'onTouched',
		defaultValues: {
			password: '',
		},
	});

	const watchPassword = watch('password');

	const { value, toggleHandler } = useToggle({ values: ['password', 'text'] });

	const changeUserPassword: SubmitHandler<Input> = async ({ password }) => {
		setProcessing(true);
		const updatedPassword = password.trim();

		await handleDataChange(
			'/api/settings/changePassword',
			updatedPassword,
			(data) => setResponse({ status: 'success', message: data.message }),
			(err) => setResponse({ status: 'error', message: err.message })
		);
		setProcessing(false);
	};

	useEffect(() => {
		reset({
			password: '',
		});
	}, [isSubmitSuccessful]);

	return (
		<div>
			<form className='flex' onSubmit={handleSubmit(changeUserPassword)}>
				<label htmlFor='change-password'></label>
				<div className='relative mr-5 grow'>
					<input
						type={value}
						id='change-password'
						className='w-full rounded-md px-4 py-2 text-slate-800 outline-indigo-500 placeholder:text-sm sm:max-w-[200px]'
						placeholder='Change Password'
						{...register('password', {
							required: 'Password is required',
							pattern: PASSWORD_REG_EXP,
						})}
						onFocus={() => setIsTouched(true)}
						onBlur={() => setIsTouched(false)}
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

				<Button
					text='Change*'
					style='px-4 py-2 text-sm ml-auto transition-colors hover:bg-teal-500'
				></Button>
			</form>

			<ErrorMessage message={errors.password?.message} style='text-red-500' />

			{isTouched && <PasswordRequirements password={watchPassword} />}
		</div>
	);
};

export default Password;
