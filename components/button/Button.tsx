interface Props {
	text?: string;
	children?: React.ReactNode;
	style?: string;
	onClickHandler?: (param?: unknown) => void;
}

const Button = ({ text, onClickHandler, style, children }: Props) => {
	return (
		<button
			className={`rounded-full bg-teal-600 ${style}`}
			onClick={onClickHandler}
		>
			{text}
			{children}
		</button>
	);
};

export default Button;
