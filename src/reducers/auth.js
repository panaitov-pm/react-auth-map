import C from '../constants';

const defaultState = {
	profile  : {},
	isAuth   : false,
	isLoading: false
};

export default (state = defaultState, action) => {
	const {type, payload} = action;

	switch (type) {
		case C.USER_SIGN_IN + C.START_LOAD:
			return {...state, isLoading: true, payload: ''};
		case C.USER_SIGN_IN + C.FINISH_LOAD:
			return {...state, profile: {...state.profile, uid: payload}, isAuth: true, isLoading: false};
		case C.USER_SIGN_UP + C.START_LOAD:
			return {...state, isLoading: true};
		case C.USER_SIGN_UP + C.FINISH_LOAD:
		case C.GET_ERRORS:
			return {...state, isLoading: false};
			case C.REMOVE_ERRORS:
			return {...state};
		case C.USER_SIGN_OUT + C.START_LOAD:
			return {...state, isLoading: true};
		case C.USER_SIGN_OUT + C.FINISH_LOAD:
			return {...state, profile: {...state.profile, uid: ''}, isAuth: false, isLoading: false};
		default:
			return state;
	}
}

