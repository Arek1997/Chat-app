interface Props {
	text?: string;
	children?: React.ReactNode;
	style?: string;
	disabled?: boolean;
	title?: string;
	onClickHandler?: (param?: unknown) => void;
}

const Button = ({
	text,
	onClickHandler,
	style,
	children,
	disabled,
	title,
}: Props) => {
	return (
		<button
			className={`rounded-full bg-teal-600 ${style} disabled:opacity-50`}
			onClick={onClickHandler}
			disabled={disabled}
			title={title}
			aria-haspopup={Boolean(title)}
			aria-label={title}
		>
			{text}
			{children}
		</button>
	);
};

export default Button;
