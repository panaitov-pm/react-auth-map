import C from '../constants';

const defaultState = {
	profile  : {},
	isAuth   : false,
	isLoading: false
};

export default (state = defaultState, action) => {
	const {type, payload} = action;

	switch (type) {
		case C.USER_SIGN_UP + C.START_LOAD:
			return {...state, isLoading: true};
		case C.USER_SIGN_UP + C.FINISH_LOAD:
		case C.GET_ERRORS:
			return {...state, isLoading: false};
		default:
			return state;
	}
}