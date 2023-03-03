import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
	message: string | undefined;
	style?: string;
}

const ErrorMessage = ({ message, style }: Props) => {
	const [parent] = useAutoAnimate();

	return (
		<p
			className={`error-msg text-center font-semibold ${style ? style : ''}`}
			ref={parent}
		>
			{message}
		</p>
	);
};

export default ErrorMessage;
