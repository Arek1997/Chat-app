import { useRef, useState } from 'react';

interface Props<T> {
	values: T[];
}

const useToggle = <T,>({ values }: Props<T>) => {
	const numberRef = useRef<number>(0);
	const [value, setValue] = useState(values[numberRef.current]);

	const toggleHandler = () => {
		numberRef.current++;

		if (numberRef.current === values.length) numberRef.current = 0;

		setValue(values[numberRef.current]);
	};

	return { value, toggleHandler };
};

export default useToggle;
