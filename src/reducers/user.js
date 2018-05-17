import C from '../constants';

const defaultState = {
	data: {},
	isLoading: true,
};

export default (state = defaultState, action) => {
	const {type, payload} = action;

	switch (type) {
		case C.GET_USER_INFO + C.START_LOAD:
			return {...state, isLoading: true};
		case C.GET_USER_INFO + C.FINISH_LOAD:
			return {...state, data: payload, isLoading: false};
		default:
			return state;
	}
}