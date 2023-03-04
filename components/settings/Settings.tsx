import { useProcessing } from '@/context/ProcessingContext';
import { logOutUserHandler } from '@/helpers';
import useResponseMessage from '@/hooks/useResponseMessage';
import Link from 'next/link';
import { useEffect } from 'react';

import Close from '../UI/close/Close';
import LoadingSpinner from '../UI/loadingSpinner/LoadingSpinner';
import Section from '../UI/section/Section';
import Email from './email/Email';
import Image from './image/Image';
import Name from './name/Name';
import Password from './password/Password';

const Settings = () => {
	const { message, response, setResponse } = useResponseMessage({
		colors: { success: 'text-green-500', error: 'text-red-500' },
		style: 'mt-5',
	});

	const { processing } = useProcessing();

	useEffect(() => {
		if (response?.status === 'success') {
			logOutUserHandler();
		}
	}, [response]);

	return (
		<Section>
			<div className='container relative flex h-full flex-col p-4'>
				{processing && <LoadingSpinner />}
				<div className='relative'>
					<h2 className='text-center text-2xl font-semibold'>Settings</h2>
					<Link href='/'>
						<Close style='right-0 text-2xl hover:opacity-80' />
					</Link>
				</div>

				{response && message}

				<div className='change-data mt-6 flex flex-col gap-y-5'>
					<Name setResponse={setResponse} />
					<Email setResponse={setResponse} />
					<Password setResponse={setResponse} />
					<Image setResponse={setResponse} />

					<p className='mt-4 underline'>
						* After success data change, you will be logged out.
					</p>
				</div>
			</div>
		</Section>
	);
};

export default Settings;
