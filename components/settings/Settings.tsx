import { availableFormats, setChoosenImageName } from '@/helpers';
import useResponseMessage from '@/hooks/useResponseMessage';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Button from '../UI/button/Button';
import Close from '../UI/close/Close';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import Section from '../UI/section/Section';

const Settings = () => {
	const { message, response, setResponse } = useResponseMessage({
		colors: { success: 'text-green-500', error: 'text-red-500' },
		style: 'mt-5',
	});

	const [imageName, setImageName] = useState('');
	const inputImageRef = useRef<HTMLInputElement>(null);

	return (
		<Section>
			<div className='container flex h-full flex-col p-4'>
				<div className='relative'>
					<h2 className='text-center text-2xl font-semibold'>Settings</h2>
					<Link href='/'>
						<Close style='right-0 text-2xl hover:opacity-80' />
					</Link>
				</div>

				{response && message}

				<div className='change-data mt-6 flex flex-col gap-y-5'>
					<div>
						<form className='flex'>
							<label htmlFor='change-name'></label>
							<input
								type='text'
								id='change-name'
								className='mr-5 grow rounded-md px-4 py-2 text-slate-800 outline-indigo-500 sm:max-w-[200px]'
								placeholder='Change Name'
							/>

							<Button text='Change' style='px-4 py-2 text-sm ml-auto'></Button>
						</form>
						<ErrorMessage message='Error' style='text-red-500' />
					</div>

					<div>
						<form className='flex'>
							<label htmlFor='change-email'></label>
							<input
								type='email'
								id='change-email'
								className='mr-5 grow rounded-md px-4 py-2 text-slate-800 outline-indigo-500 sm:max-w-[200px]'
								placeholder='Change Email'
							/>
							<Button text='Change' style='px-4 py-2 text-sm ml-auto'></Button>
						</form>
						<ErrorMessage message='Error' style='text-red-500' />
					</div>

					<div>
						<form className='flex'>
							<label htmlFor='change-password'></label>
							<input
								type='password'
								id='change-password'
								className='mr-5 grow rounded-md px-4 py-2 text-slate-800 outline-indigo-500 sm:max-w-[200px]'
								placeholder='Change Password'
							/>
							<Button text='Change' style='px-4 py-2 text-sm ml-auto'></Button>
						</form>
						<ErrorMessage message='Error' style='text-red-500' />
					</div>

					<div>
						<form className='flex items-center'>
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
								ref={inputImageRef}
								type='file'
								accept={availableFormats
									.map((format) => `image/${format}`)
									.join(', ')}
								id='change-image'
								className='hidden'
								aria-hidden
								onChange={() =>
									setChoosenImageName(
										inputImageRef.current?.value!,
										setImageName
									)
								}
							/>
							<Button text='Change' style='px-4 py-2 text-sm ml-auto'></Button>
						</form>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Settings;
