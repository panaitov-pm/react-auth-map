import C from '../constants';
import {auth} from '../firebase/firebase';
import * as db from '../firebase/db';

export const userSignUp = (username, email, password, history) => dispatch => {
	dispatch({
		type: C.USER_SIGN_UP + C.START_LOAD
	});
	auth.createUserWithEmailAndPassword(email, password)
	.then(({user}) => {
		db.createUser(user.uid, username, email)
		.then(() => {
			dispatch({
				type: C.USER_SIGN_UP + C.FINISH_LOAD
			});
			history.push('/sign-in');
		}).catch(err => {
			dispatch({
				type   : C.GET_ERRORS,
				payload: err
			});
		})
	}).catch(err => {
		dispatch({
			type   : C.GET_ERRORS,
			payload: err
		});
	})
};

export const userSignIn = (email, password, history) => dispatch => {
	dispatch({
		type: C.USER_SIGN_IN + C.START_LOAD
	});
	auth.signInWithEmailAndPassword(email, password)
		.then(({user}) => {
			dispatch({
				type: C.USER_SIGN_IN + C.FINISH_LOAD,
				payload: user.uid
			});
			localStorage.setItem('userId', user.uid);
			history.push('/profile');
		})
		.catch(err => {
			dispatch({
				type   : C.GET_ERRORS,
				payload: err
			});
		})
};

export const setCurrentUser = (uid) => dispatch => {
	dispatch({
		type: C.USER_SIGN_IN + C.FINISH_LOAD,
		payload: uid
	});
};