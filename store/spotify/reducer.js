import initialState from './initialState';
import * as ACTIONS from '../../constants/actions';

export default function spotifyReducer(
	state = initialState,
	{ type, payload },
) {
	switch (type) {
		case ACTIONS.SET_PLAYLIST:
			return {
				...state,
				playlist: payload,
			};

		case ACTIONS.SET_ACCESS_TOKEN:
			return {
				...state,
				accessToken: payload,
			};

		default:
			return state;
	}
}
