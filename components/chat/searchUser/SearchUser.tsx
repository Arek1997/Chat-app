import { useEffect, useState } from 'react';
import { findUserByUserName } from '@/helpers';
import ChatItem from '../ChatItem';

let content: string | JSX.Element;

interface UserResult {
	name: string;
	id: string;
	email: string;
	image: string;
}

const SearchUser = () => {
	const [searchUser, setSearchUser] = useState('');
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<UserResult[] | undefined>();

	const searchUserHandler = async () => {
		const user = await findUserByUserName(searchUser);
		setResult(user);
		setLoading(false);
	};

	useEffect(() => {
		if (searchUser.trim().length === 0) return;

		const timeout = setTimeout(searchUserHandler, 1000);

		return () => clearTimeout(timeout);
	}, [searchUser]);

	if (loading) {
		content = 'Search...';
	}

	if (!result || (result?.length === 0 && !loading)) {
		content = 'User not found.';
	}

	if (result && result?.length > 0 && !loading) {
		content = (
			<ul>
				{result.map((result) => (
					<li key={result.id}>
						<ChatItem userName={result.name} userImage={result.image} />
					</li>
				))}
			</ul>
		);
	}

	console.log(result);

	return (
		<div className='search border-b-[1px] p-4'>
			<div className='search-input relative'>
				<label htmlFor='search-user'></label>
				<input
					type='text'
					name='search-user'
					id='search-user'
					className='w-full rounded-lg bg-cyan-600 px-4 py-2 outline-none placeholder:text-slate-300'
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
						onClick={() => setSearchUser('')}
					>
						✖
					</span>
				)}
			</div>
			{searchUser.trim().length > 0 && (
				<div className='result customScroll mt-4 max-h-[150px] overflow-y-auto'>
					{content}
				</div>
			)}
		</div>
	);
};

export default SearchUser;
