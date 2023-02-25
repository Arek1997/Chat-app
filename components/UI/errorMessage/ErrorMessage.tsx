interface Props {
	message: string | undefined;
	style?: string;
}

const ErrorMessage = ({ message, style }: Props) => {
	return (
		<p className={`error-msg text-center font-semibold ${style ? style : ''}`}>
			{message}
		</p>
	);
};

export default ErrorMessage;
