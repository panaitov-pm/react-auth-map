import axios from 'axios';
import C from '../constants';
import {auth} from '../firebase/firebase';
import * as db from '../firebase/db';

const GOOGLE_API_ROOT_LINK = 'https://maps.googleapis.com/maps/api/';
const GOOGLE_API_KEY = 'AIzaSyBNrCygq-xbcX7aBCJAXzLYvDwDO4zQG7w';

export const userSignUp = (username, email, password, history) => dispatch => {
	dispatch({
		type: C.USER_SIGN_UP + C.START_LOAD
	});
	dispatch({
		type   : C.GET_ERRORS,
		payload: {}
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
	dispatch({
		type   : C.GET_ERRORS,
		payload: {}
	});
	auth.signInWithEmailAndPassword(email, password)
	.then(({user}) => {
		dispatch({
			type   : C.USER_SIGN_IN + C.FINISH_LOAD,
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

export const signOut = (history) => dispatch => {
	dispatch({
		type: C.USER_SIGN_OUT + C.START_LOAD
	});
	dispatch({
		type   : C.GET_ERRORS,
		payload: {}
	});
	auth.signOut().then(() => {
		dispatch({
			type: C.USER_SIGN_OUT + C.FINISH_LOAD
		});
		localStorage.removeItem('userId');
		history.push('/sign-in');
	}).catch(err => {
		dispatch({
			type   : C.GET_ERRORS,
			payload: err
		});
	})

};

export const getCurrentUserId = (uid) => dispatch => {
	dispatch({
		type   : C.USER_SIGN_IN + C.FINISH_LOAD,
		payload: uid
	});
};

export const getUserInfo = (uid) => dispatch => {
	dispatch({
		type: C.GET_USER_INFO + C.START_LOAD
	});
	db.getUserName(uid)
	.then((snapshot) => {
		const name = (snapshot.val() && snapshot.val().username) || '';
		const email = snapshot.val().email;
		const coordinates = (snapshot.val() && snapshot.val().coordinates) || [];
		const address = (snapshot.val() && snapshot.val().address) || [];
		dispatch({
			type   : C.GET_USER_INFO + C.FINISH_LOAD,
			payload: {name, email},
			coordinates,
			address
		});
	}).catch(err => {
		dispatch({
			type   : C.GET_ERRORS,
			payload: err
		});
	})
};

export const getMarker = (coord) => dispatch => {
	dispatch({
		type   : C.GET_MARKER,
		payload: coord
	});
	axios.get(`${GOOGLE_API_ROOT_LINK}geocode/json?latlng=${coord[0]},${coord[1]}&key=${GOOGLE_API_KEY}`)
	.then(res => res.data.results[0].address_components)
	.then(data =>
		dispatch({
			type   : C.GET_ADDRESS,
			payload: `${data[1].long_name}, ${data[0].long_name}`
		}))
	.catch(err => dispatch({
		type   : C.GET_ERRORS,
		payload: err
	}));
};

export const saveMarkers = (uid, coordinates, address) => dispatch => {
	dispatch({
		type: C.SAVE_MARKERS + C.START_LOAD
	});
	db.setAddressCurrentUser(uid, address);
	db.setMarkersCurrentUser(uid, coordinates)
	.then(() => {
		dispatch({
			type: C.SAVE_MARKERS + C.FINISH_LOAD
		});
	}).catch(err => {
		dispatch({
			type   : C.GET_ERRORS,
			payload: err
		});
	});
};


