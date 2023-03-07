import Button from '@/components/UI/button/Button';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import { useProcessing } from '@/context/ProcessingContext';
import { handleDataChange } from '@/helpers';
import { EMAIL_REG_EXP } from '@/helpers/variables';
import { Response } from '@/interface';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
	setResponse: (data: Response) => void;
}

interface Input {
	email: string;
}

const Email = ({ setResponse }: Props) => {
	const { setProcessing } = useProcessing();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Input>({
		mode: 'onTouched',
		defaultValues: {
			email: '',
		},
	});

	const changeUserEmail: SubmitHandler<Input> = async ({ email }) => {
		setProcessing(true);
		const updatedEmail = email;

		await handleDataChange(
			'/api/settings/changeEmail',
			updatedEmail,
			(data) => setResponse({ status: 'success', message: data.message }),
			(err) => setResponse({ status: 'error', message: err.message })
		);
		setProcessing(false);
	};

	useEffect(() => {
		reset({
			email: '',
		});
	}, [isSubmitSuccessful]);

	return (
		<div>
			<form className='flex' onSubmit={handleSubmit(changeUserEmail)}>
				<label htmlFor='change-email'></label>
				<input
					type='email'
					id='change-email'
					className='mr-5 w-full rounded-md px-4 py-2 text-slate-800 outline-indigo-500 placeholder:text-sm sm:max-w-[200px]'
					placeholder='Change Email'
					{...register('email', {
						required: 'Email is required',
						pattern: {
							message: 'Email is not correct',
							value: EMAIL_REG_EXP,
						},
					})}
				/>

				<Button
					text='Change*'
					style='px-4 py-2 text-sm ml-auto transition-colors hover:bg-teal-500'
				></Button>
			</form>

			<ErrorMessage message={errors.email?.message} style='text-red-500' />
		</div>
	);
};

export default Email;
