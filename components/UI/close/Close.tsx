interface Props {
	style: string;
	onClick?: () => void;
}

const Close = ({ style, onClick }: Props) => {
	return (
		<span
			className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${style}`}
			title='Close'
			aria-label='Close'
			onClick={onClick ? onClick : undefined}
		>
			✖
		</span>
	);
};

export default Close;
