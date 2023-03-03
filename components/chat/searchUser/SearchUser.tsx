import { useEffect, useState } from 'react';
import { findUserByUserName } from '@/helpers';
import ChatItem from '../ChatItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';

let content: string | JSX.Element;

interface UserResult {
	name: string;
	id: string;
	email: string;
	image: string;
}

const SearchUser = () => {
	const [parent] = useAutoAnimate();
	const [searchUser, setSearchUser] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<UserResult[] | undefined | null>();

	const searchUserHandler = async () => {
		const user = await findUserByUserName(searchUser);
		setResult(user);
		setLoading(false);
	};

	const resetInputAndResult = () => {
		setSearchUser('');
		setResult(null);
	};

	useEffect(() => {
		if (searchUser.trim().length === 0) return;

		const timeout = setTimeout(searchUserHandler, 1000);

		return () => clearTimeout(timeout);
	}, [searchUser]);

	if (loading) {
		content = 'Search...';
	}

	if ((!result && !loading) || (result?.length === 0 && !loading)) {
		content = 'User not found.';
	}

	if (result && result?.length > 0 && !loading) {
		content = (
			<ul>
				{result.map((result) => (
					<li key={result.id}>
						<ChatItem
							id={result.id}
							userName={result.name}
							userImage={result.image}
							onClear={resetInputAndResult}
						/>
					</li>
				))}
			</ul>
		);
	}

	return (
		<div className='search border-b-[1px] px-2 pt-4 pb-2'>
			<div className='search-input relative px-2'>
				<label htmlFor='search-user'></label>
				<input
					type='text'
					name='search-user'
					id='search-user'
					className='w-full rounded-lg bg-cyan-600 px-4 py-2 outline-cyan-500 placeholder:text-slate-300'
					placeholder='Search user'
					value={searchUser}
					onChange={(e) => {
						setLoading(true);
						setSearchUser(e.target.value);
					}}
				/>

				{searchUser.trim().length > 0 && (
					<span
						className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer'
						onClick={resetInputAndResult}
					>
						✖
					</span>
				)}
			</div>
			{searchUser.trim().length > 0 && (
				<div
					className='result customScroll mt-4 max-h-[150px] overflow-y-auto'
					ref={parent}
				>
					{content}
				</div>
			)}
		</div>
	);
};

export default SearchUser;
