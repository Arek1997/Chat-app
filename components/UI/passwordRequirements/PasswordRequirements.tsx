import { validPassword } from '@/helpers';
import {
	BIG_LETTERS,
	PASSWORD_MIN_LENGTH,
	SMALL_LETTERS,
} from '@/helpers/variables';
import { NUMBERS_ARR, SPECIAL_CHARACTERS } from '@/helpers/variables';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
	password: string;
}

const PasswordRequirements = ({ password }: Props) => {
	const providedPassword = password.trim();

	const [parent] = useAutoAnimate();

	const length = providedPassword.length >= PASSWORD_MIN_LENGTH;

	const smallLetter = new RegExp(SMALL_LETTERS).test(providedPassword);

	const bigLetter = new RegExp(BIG_LETTERS).test(providedPassword);

	const number = NUMBERS_ARR.some((number) =>
		providedPassword.includes(number.toString())
	);

	const specialCharacter = SPECIAL_CHARACTERS.some((character) =>
		providedPassword.includes(character)
	);

	const isPasswordCorrect = validPassword(providedPassword);

	return (
		<div className='mt-4 text-sm'>
			{
				<h3
					className={`mb-2 font-semibold ${
						isPasswordCorrect ? 'text-green-400' : ''
					}`}
				>
					{!isPasswordCorrect
						? 'Password have to contains:'
						: 'Password correct'}
				</h3>
			}

			<ul className='list-inside list-disc pl-4' ref={parent}>
				{!length && <li>At least 8 characters</li>}
				{!smallLetter && <li>Small letter [a-z]</li>}
				{!bigLetter && <li>Big letter [A-Z]</li>}
				{!number && <li>Number [0-9]</li>}
				{!specialCharacter && <li>Special characters [!@#$%^&*]</li>}
			</ul>
		</div>
	);
};

export default PasswordRequirements;
