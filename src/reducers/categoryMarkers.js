import C from '../constants';

const defaultState = {
	categoryMarkers: [],
	isLoading: false,
};

export default (state = defaultState, action) => {
	const {type, payload} = action;

	switch (type) {
		case C.GET_CATEGORY_MARKERS + C.START_LOAD:
			return {...state, isLoading: true};
		case C.GET_CATEGORY_MARKERS + C.FINISH_LOAD:
			return {...state, categoryMarkers: payload, isLoading: false};
		default:
			return state;
	}
}
