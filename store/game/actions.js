import * as ACTIONS from '../../constants/actions';
import bindListeners from '../../socket/listeners';
import {
	createRoom,
	closeRoom,
	joinRoom,
	startGame,
} from '../../socket/emissions';

export const createSocket = (socket) => ({
	type: ACTIONS.CREATE_SOCKET,
	payload: socket,
});

export const removeSocket = () => ({
	type: ACTIONS.REMOVE_SOCKET,
});

export const setIsHost = (isHost) => ({
	type: ACTIONS.SET_IS_HOST,
	payload: isHost,
});

export const setIsInLobby = (isInLobby) => ({
	type: ACTIONS.SET_IS_IN_LOBBY,
	payload: isInLobby,
});

export const setIsGameStarted = (isGameStarted) => ({
	type: ACTIONS.SET_IS_GAME_STARTED,
	payload: isGameStarted,
});

export const leaveLobby = (isHost) => {
	return (dispatch, getState) => {
		if (isHost) {
			let { socket, roomCode } = getState().game;
			closeRoom(socket, roomCode);
		}
		dispatch({
			type: ACTIONS.LEAVE_lOBBY,
		});
	};
};

export const updateRoomInfo = (data) => ({
	type: ACTIONS.UPDATE_ROOM_INFO,
	payload: data,
});

export const enterLobby = (isHost) => {
	return (dispatch, getState) => {
		if (isHost) {
			let { socket } = getState().game;
			createRoom(socket, isHost);
		}
		dispatch(setIsInLobby(true));
		dispatch(setIsHost(isHost));
	};
};

export const connectToServer = (io) => {
	let socket = io();

	return (dispatch, getState) => {
		bindListeners(socket, dispatch, getState);

		dispatch(createSocket(socket));
	};
};

export const lobbyDisconnectFromServer = () => {
	return async (dispatch, getState) => {
		let { isInLobby, isHost, socket, isGameStarted } = getState().game;
		if (isInLobby && !isGameStarted) {
			await dispatch(leaveLobby(isHost));
		}
		socket.disconnect();
		dispatch(removeSocket());
	};
};

export const joinRoomAction = (roomCode, alias) => {
	return (dispatch, getState) => {
		let { socket } = getState().game;
		joinRoom(socket, { roomCode, alias });
		dispatch(setIsInLobby(true));
	};
};

export const hostStartGame = (socket, isHost, roomCode) => {
	if (isHost) {
		startGame(socket, { roomCode: roomCode, isHost: isHost });
	}
};
