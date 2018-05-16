import C from '../constants';
import {auth} from '../firebase/firebase';
import * as db from '../firebase/db';

export const userSignUp = (username,email, password, history) => dispatch => {
	dispatch({
		type: C.USER_SIGN_UP + C.START_LOAD,
	});
	auth.createUserWithEmailAndPassword(email, password)
		.then(({user}) => {
			console.log('---', user);
			db.createUser(user.uid, username, email)
			.then(()=> {
				dispatch({
					type: C.USER_SIGN_UP + C.FINISH_LOAD,
				});
				history.push('/sign-in');
			}).catch(err => {
				dispatch({
					type: C.GET_ERRORS,
					payload: err,
				});
			})
		}).catch(err => {
			dispatch({
				type: C.GET_ERRORS,
				payload: err,
			});
	})
};