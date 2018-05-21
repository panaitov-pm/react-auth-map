import {combineReducers} from 'redux';
import auth from './auth';
import errors from './errors';
import user from './user';
import categoryMarkers from './categoryMarkers';

export default combineReducers({
	auth,
	errors,
	user,
	categoryMarkers,
});
