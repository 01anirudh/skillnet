import { SET_LOADING_STATUS, GET_ARTICLES,SET_UPLOAD_PROGRESS } from "./article.types";

export const initialState = {
	loading: false,
	articles: [],
};

function articleReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ARTICLES:
			return {
				...state,
				articles: action.payload,
				ids: action.id,
			};
		case SET_LOADING_STATUS:
			return {
				...state,
				loading: action.status,
			};
		case SET_UPLOAD_PROGRESS:
			return {
				...state,
				uploadProgress: action.payload,
			};

		default:
			return state;
	}
}

export default articleReducer;