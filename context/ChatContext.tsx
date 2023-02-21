import { createContext, Dispatch, useContext, useState } from 'react';

const ChatContext = createContext<ContextInterface | null>(null);

interface ContextInterface {
	chatData: ChatInterface | null;
	updateSelectedChat: (data: ChatInterface | null) => void;
}

interface ChatInterface {
	chatId: string;
	selectedUserId: string;
	selectedUserName: string;
}

interface Props {
	children: React.ReactNode;
}

const ChatContextProvider = ({ children }: Props) => {
	const [chatData, setChatData] = useState<ChatInterface | null>(null);

	const updateSelectedChat = (data: ChatInterface | null) => setChatData(data);

	const value = {
		chatData,
		updateSelectedChat,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useSelectChat = () => useContext(ChatContext);

export default ChatContextProvider;
