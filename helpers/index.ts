import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	UserCredential,
	signOut,
} from 'firebase/auth';
import {
	doc,
	setDoc,
	getDocs,
	collection,
	getDoc,
	updateDoc,
	onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { signOut as NextsignOut } from 'next-auth/react';
import {
	AVAILABLE_IMAGE_FORMATS,
	EMAIL_REG_EXP,
	NAME_REG_EXP,
	PASSWORD_REG_EXP,
} from './variables';

export const fetchData = async (url: string, options?: object) => {
	const res = await fetch(url, options);
	const data = await res.json();
	return { res, data };
};

export const validName = (name: string) => {
	const isValid = new RegExp(NAME_REG_EXP).test(name);
	return isValid;
};

export const validEmail = (email: string) => {
	const isValid = new RegExp(EMAIL_REG_EXP).test(email);
	return isValid;
};

export const validPassword = (password: string) => {
	const isValid = new RegExp(PASSWORD_REG_EXP).test(password);
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

export const logUserToFirebase = async (email: string, password: string) => {
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

export const logOutUserFromFirebase = async () => await signOut(auth);

export const logOutUserHandler = async () => {
	try {
		await logOutUserFromFirebase();
		await NextsignOut();
	} catch (err) {
		alert(err);
		console.log(err);
	}
};

export const saveUserInFireStoreCollection = async (
	id: string,
	userData: { id: string; name: string; email: string }
) => {
	await setDataToCollection(
		process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USERS!,
		id,
		userData
	);

	await setDataToCollection(
		process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USER_CHATS!,
		id,
		{
			owner: userData,
		}
	);
};

export const findUserByUserName = async (userName: string) => {
	const availableUsers: any = [];

	const querySnapshot = await getDocs(
		collection(db, process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_USERS!)
	);
	querySnapshot.forEach((doc) => availableUsers.push(doc.data()));

	const user = availableUsers.filter((user: any) =>
		user.name.toLocaleLowerCase().includes(userName.trim().toLocaleLowerCase())
	);

	return user;
};

export const getDataFromCollection = async (
	collectionName: string,
	id: string
) => {
	const docSnap = await getDoc(doc(db, collectionName, id));
	return docSnap;
};

export const getRealTimeDataFromCollection = (
	collectionName: string,
	id: string,
	callback: (data: any) => void
) => {
	const unsub = onSnapshot(doc(db, collectionName, id), (doc) =>
		callback(doc.data())
	);

	return unsub;
};

export const setDataToCollection = async (
	collectionName: string,
	id?: string,
	data?: object
) => {
	const identifier = id ? id : crypto.randomUUID();

	await setDoc(doc(db, collectionName, identifier), data ? data : {});
};

export const updateCollectionData = async (
	collectionName: string,
	id: string,
	data: object
) => {
	await updateDoc(doc(db, collectionName, id), data);
};

export const checkIfFileIsAnImage = (
	file: File,
	callback: (arg: string) => void
) => {
	if (checkFormat(file, 'image', AVAILABLE_IMAGE_FORMATS)) {
		callback(file.name);
	} else {
		alert(
			`Only images with ${AVAILABLE_IMAGE_FORMATS.join(
				', '
			)} format are available.`
		);
	}
};

export const checkFormat = (
	file: File,
	typeOfFile: string,
	availableImageFormats: string[]
) => {
	const fileType = file.type.split('/').shift();

	if (
		fileType === typeOfFile &&
		availableImageFormats.some((format) => file.name?.endsWith(format))
	) {
		return true;
	} else {
		return false;
	}
};

export const handleDataChange = async <T>(
	url: string,
	reqBody: string | T,
	onSuccess: (data: any) => void,
	onError: (err: any) => void
) => {
	const headers =
		typeof reqBody === 'string'
			? {
					'Content-Type': 'application/json',
			  }
			: undefined;
	const body =
		typeof reqBody === 'string' ? JSON.stringify({ reqBody }) : reqBody;

	try {
		const { res, data } = await fetchData(url, {
			method: 'POST',
			headers,
			body,
		});

		if (!res.ok) {
			const { errorMessage } = data;
			throw new Error(errorMessage);
		}

		onSuccess(data);
	} catch (err: any) {
		onError(err);
	}
};
