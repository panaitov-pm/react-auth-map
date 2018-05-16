import C from '../constants';
import {auth} from '../firebase/firebase';

export const userSignUp = (email, password) => dispatch => {
	dispatch({
		type: C.USER_SIGN_UP + C.START_LOAD,
	});
	auth.createUserWithEmailAndPassword(email, password)
		.then((resp) => {
			dispatch({
				type: C.USER_SIGN_UP + C.FINISH_LOAD,
				payload: resp
			});
		}).catch(err => {
			dispatch({
				type: C.GET_ERRORS,
				payload: err
			});
	})
};