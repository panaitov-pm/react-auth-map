import C from '../constants';

const defaultState = {
	data       : {},
	isLoading  : true,
	coordinates: [],
	address    : []
};

export default (state = defaultState, action) => {
	const {type, payload, coordinates, address} = action;

	switch (type) {
		case C.GET_USER_INFO + C.START_LOAD:
		case C.SAVE_MARKERS + C.START_LOAD:
			return {...state, isLoading: true};
		case C.GET_USER_INFO + C.FINISH_LOAD:
			return {
				...state, data: payload,
				coordinates   : [...coordinates],
				address       : [...address],
				isLoading     : false
			};
		case C.GET_MARKER:
			return {...state, coordinates: [...state.coordinates, [...payload]], isLoading: false};
		case C.GET_ADDRESS:
			return {...state, address: [...state.address, payload]};
		case C.SAVE_MARKERS + C.FINISH_LOAD:
			return {...state, isLoading: false};
		case C.GET_ERRORS:
			return {...state, isLoading: false};
		default:
			return state;
	}
}