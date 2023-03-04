import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from 'react';

const ProcessingContext = createContext<ContextInterface>({
	processing: false,
	setProcessing: () => {},
});

interface ContextInterface {
	processing: boolean;
	setProcessing: Dispatch<SetStateAction<boolean>>;
}

interface Props {
	children: React.ReactNode;
}

const ProcessingContextProvider = ({ children }: Props) => {
	const [processing, setProcessing] = useState(false);

	const value = {
		processing,
		setProcessing,
	};

	return (
		<ProcessingContext.Provider value={value}>
			{children}
		</ProcessingContext.Provider>
	);
};

export const useProcessing = () => useContext(ProcessingContext);

export default ProcessingContextProvider;
