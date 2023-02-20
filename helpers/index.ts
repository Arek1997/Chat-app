import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	UserCredential,
	signOut,
} from 'firebase/auth';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../firebase.config';

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
	const newUser: UserCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	return newUser;
};

export const logUser = async (email: string, password: string) => {
	const loggedUser: UserCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	return loggedUser;
};

export const updateUser = async (name: string, photo?: string) => {
	const user = await updateProfile(auth.currentUser!, {
		displayName: name,
		photoURL: photo,
	});
	return user;
};

export const logOutUser = async () => {
	const user = await signOut(auth);
	return user;
};

export const saveUserInFireStoreUsersColl = async (
	id: string,
	userData: { id: string; name: string; email: string }
) => {
	await setDoc(
		doc(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USERS!, id),
		userData
	);

	await setDoc(
		doc(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!, id),
		{}
	);
};

export const findUserByUserName = async (userName: string) => {
	const availableUsers: any = [];

	const querySnapshot = await getDocs(
		collection(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USERS!)
	);
	querySnapshot.forEach((doc) => availableUsers.push(doc.data()));

	const user = availableUsers.find((user: any) =>
		user.name.toLocaleLowerCase().includes(userName.trim().toLocaleLowerCase())
	);

	return user;
};
