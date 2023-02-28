import { Response } from '@/interface';
import { useEffect, useState } from 'react';

interface Props {
	style: string;
	colors: {
		success: string;
		error: string;
	};
}

const useResponseMessage = ({ style, colors }: Props) => {
	const [response, setResponse] = useState<Response | null>();

	const responseColor =
		response?.status === 'success' ? `${colors.success}` : `${colors.error}`;

	const message = (
		<span
			className={`block text-center font-semibold ${responseColor} ${style}`}
		>
			{response?.message}
		</span>
	);

	useEffect(() => {
		if (response?.status === 'success') {
			const timeout = setTimeout(() => {
				setResponse(null);
			}, 2000);

			return () => clearTimeout(timeout);
		}
	}, [response]);

	return { message, response, setResponse };
};

export default useResponseMessage;
