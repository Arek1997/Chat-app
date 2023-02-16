import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	UserCredential,
	signOut,
} from 'firebase/auth';
import { app } from '../firebase.config';

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

export const createNewUser = async (email: string, password: string) => {
	const auth = getAuth(app);
	const newUser: UserCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	return newUser;
};

export const logUser = async (email: string, password: string) => {
	const auth = getAuth(app);
	const loggedUser: UserCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	return loggedUser;
};

export const updateUser = async (name: string, photo?: string) => {
	const auth = getAuth(app);
	const user = await updateProfile(auth.currentUser!, {
		displayName: name,
		photoURL: photo,
	});
	return user;
};

export const signOutUser = async () => {
	const auth = getAuth(app);
	const user = await signOut(auth);
	return user;
};
