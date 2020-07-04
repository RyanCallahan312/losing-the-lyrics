import initialState from './initialState';
import * as ACTIONS from '../../constants/actions';

export default function gameReducer(state = initialState, { type, payload }) {
	switch (type) {
		// case ACTIONS.CHANGE_WHACKY_STATE_BOX:
		// 	return {
		// 		...state,
		// 		whackyStateBox: payload,
		// 	};

		case ACTIONS.SET_IS_HOST:
			return {
				...state,
				isHost: payload,
			};

		case ACTIONS.SET_IS_IN_LOBBY:
			return {
				...state,
				isInLobby: payload,
			};

		default:
			return state;
	}
}
