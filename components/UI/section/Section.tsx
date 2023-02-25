interface Props {
	children: React.ReactNode;
}

const Section = ({ children }: Props) => {
	return (
		<section className='customScroll fade-in-from-bottom h-screen overflow-y-auto overflow-x-hidden bg-cyan-700 text-slate-100 sm:mx-auto sm:max-h-[600px] sm:max-w-[350px] sm:rounded-lg'>
			{children}
		</section>
	);
};

export default Section;
