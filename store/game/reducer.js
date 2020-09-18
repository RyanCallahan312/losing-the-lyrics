import initialState from './initialState';
import * as ACTIONS from '../../constants/actions';

export default function gameReducer(state = initialState, { type, payload }) {
	switch (type) {
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

		case ACTIONS.LEAVE_lOBBY:
			return {
				...state,
				isHost: null,
				alias: null,
				isInLobby: false,
				isGameStarted: false,
				isSinging: false,
				roomCode: null,
				userList: [],
				lyrics: null,
				turnOrder: [],
				currentTurn: null,
				roundNumber: 0,
			};

		case ACTIONS.CREATE_SOCKET:
			return {
				...state,
				socket: payload,
			};

		case ACTIONS.REMOVE_SOCKET:
			return {
				...state,
				socket: null,
			};

		case ACTIONS.UPDATE_ROOM_INFO:
			return {
				...state,
				...payload,
			};

		case ACTIONS.SET_IS_GAME_STARTED:
			return {
				...state,
				isGameStarted: payload,
			};

		case ACTIONS.SET_CURRENT_TURN:
			return {
				...state,
				currentTurn: payload,
			};

		default:
			return state;
	}
}
