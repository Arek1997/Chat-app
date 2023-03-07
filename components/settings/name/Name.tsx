import Button from '@/components/UI/button/Button';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import { useProcessing } from '@/context/ProcessingContext';
import { handleDataChange } from '@/helpers';
import { NAME_REG_EXP } from '@/helpers/variables';
import { Response } from '@/interface';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
	setResponse: (data: Response) => void;
}

interface Input {
	name: string;
}

const Name = ({ setResponse }: Props) => {
	const { setProcessing } = useProcessing();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Input>({
		mode: 'onTouched',
		defaultValues: {
			name: '',
		},
	});

	const changeUserName: SubmitHandler<Input> = async ({ name }) => {
		setProcessing(true);
		const updatedName = name.trim();

		await handleDataChange(
			'/api/settings/changeName',
			updatedName,
			(data) => setResponse({ status: 'success', message: data.message }),
			(err) => setResponse({ status: 'error', message: err.message })
		);
		setProcessing(false);
	};

	useEffect(() => {
		reset({
			name: '',
		});
	}, [isSubmitSuccessful]);

	return (
		<div>
			<form className='flex' onSubmit={handleSubmit(changeUserName)}>
				<label htmlFor='change-name'></label>
				<input
					type='text'
					id='change-name'
					className='mr-5 w-full rounded-md px-4 py-2 text-slate-800 outline-indigo-500 placeholder:text-sm sm:max-w-[200px]'
					placeholder='Change Name'
					{...register('name', {
						required: 'Name is required',
						pattern: {
							message: 'Name have to be at least 3 characters',
							value: NAME_REG_EXP,
						},
					})}
				/>

				<Button
					text='Change*'
					style='px-4 py-2 text-sm ml-auto transition-colors hover:bg-teal-500'
				></Button>
			</form>

			<ErrorMessage message={errors.name?.message} style='text-red-500' />
		</div>
	);
};

export default Name;
