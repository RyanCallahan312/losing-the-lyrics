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
				isRoundStarted: false,
				turnResults: null,
				roomCode: null,
				clients: [],
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

		case ACTIONS.SET_IS_ROUND_STARTED:
			return {
				...state,
				isRoundStarted: payload,
			};

		case ACTIONS.SET_IS_SINGING:
			return {
				...state,
				isSinging: payload,
			};

		case ACTIONS.SET_TURN_RESULTS:
			return {
				...state,
				turnResults: payload,
			};

		default:
			return state;
	}
}
