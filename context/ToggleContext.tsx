import { useReducer, useContext, createContext } from 'react';

const initialState = {
	chatListOpen: true,
	chatOpen: false,
};

interface ActionType {
	type: 'toggle';
}

interface ContextInterface {
	state: typeof initialState;
	toggleHandler: () => void;
}

interface Props {
	children: React.ReactNode;
}

const ToggleContext = createContext<ContextInterface>({
	state: initialState,
	toggleHandler: () => {},
});

const reducer = (state: typeof initialState, action: ActionType) => {
	if (action.type === 'toggle') {
		return {
			chatListOpen: !state.chatListOpen,
			chatOpen: !state.chatOpen,
		};
	}

	return state;
};

const ToggleContextProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const toggleHandler = () => dispatch({ type: 'toggle' });

	return (
		<ToggleContext.Provider value={{ state, toggleHandler }}>
			{children}
		</ToggleContext.Provider>
	);
};

export const useToggle = () => useContext(ToggleContext);
export default ToggleContextProvider;
