export const fetchData = async (url: string, options?: object) => {
	const res = await fetch(url, options);
	const data = await res.json();
	return { res, data };
};

export const validEmail = (email: string) => {
	const isValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
	return isValid;
};

export const validPassword = (password: string) => {
	const isValid = new RegExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/gm
	).test(password);
	return isValid;
};
