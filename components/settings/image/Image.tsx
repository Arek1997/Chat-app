import Button from '@/components/UI/button/Button';
import ErrorMessage from '@/components/UI/errorMessage/ErrorMessage';
import {
	availableImageFormats,
	handleDataChange,
	checkIfFileIsAnImage,
	MAX_IMAGE_SIZE_IN_MB,
} from '@/helpers';
import { Response } from '@/interface';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useProcessing } from '@/context/ProcessingContext';

interface Props {
	setResponse: (data: Response) => void;
}

interface Input {
	file: FileList;
}

const Image = ({ setResponse }: Props) => {
	const [imageName, setImageName] = useState('');
	const [imagePath, setimagePath] = useState('');
	const [parent] = useAutoAnimate();
	const { setProcessing } = useProcessing();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<Input>({
		mode: 'onTouched',
		defaultValues: {
			file: undefined,
		},
	});

	const changeUserImage: SubmitHandler<Input> = ({ file }) => {
		setProcessing(true);
		const selectedFile = file[0];

		if (selectedFile.size > MAX_IMAGE_SIZE_IN_MB * 1024 * 1024) {
			setProcessing(false);
			return setResponse({
				status: 'error',
				message: `Maximum image size is ${MAX_IMAGE_SIZE_IN_MB}mb`,
			});
		}

		const reader = new FileReader();

		reader.readAsDataURL(selectedFile);
		reader.onload = async () => {
			const dataUrl = reader.result;

			await handleDataChange(
				'/api/settings/changeImage',
				dataUrl,
				(data) => setResponse({ status: 'success', message: data.message }),
				(err) => setResponse({ status: 'error', message: err.message })
			);
			setProcessing(false);
		};
	};

	useEffect(() => {
		setImageName('');
		setimagePath('');
		reset({
			file: undefined,
		});
	}, [isSubmitSuccessful]);

	return (
		<div ref={parent}>
			<form
				className='flex items-center'
				onSubmit={handleSubmit(changeUserImage)}
			>
				<label
					htmlFor='change-image'
					className='cursor-pointer transition-opacity hover:opacity-80'
					aria-label='Change Image'
					title='Change Image'
					aria-haspopup
				>
					<p className='max-w-[200px] px-4 py-2'>
						{imageName ? imageName : 'Choose an image'}
					</p>
				</label>

				<input
					type='file'
					accept={availableImageFormats
						.map((format) => `image/${format}`)
						.join(', ')}
					id='change-image'
					className='hidden'
					aria-hidden
					{...register('file', {
						required: 'Choose some image',
						onChange: (e) => {
							setImageName('');
							setimagePath('');

							const file = e.target.files[0] as File;

							if (file) {
								checkIfFileIsAnImage(file, setImageName);
								setimagePath(URL.createObjectURL(file));
							}
						},
					})}
				/>
				<Button
					text='Change*'
					style='px-4 py-2 text-sm ml-auto transition-colors hover:bg-teal-500'
				></Button>
			</form>

			<ErrorMessage message={errors.file?.message} style='text-red-500' />
			{imagePath && <img src={imagePath} alt='Selected image' />}
		</div>
	);
};

export default Image;
