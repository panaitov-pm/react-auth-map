import {db} from './firebase';

export const createUser = (id, username, email) => (
	db.ref(`users/${id}`).set({
		username,
		email,
	})
);

export const getUserName = (id) => (
	db.ref(`users/${id}`).once('value')
);