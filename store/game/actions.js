import * as ACTIONS from '../../constants/actions';
import bindListeners from '../../client/listeners';
import * as emit from '../../client/emissions';

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

export const setCurrentTurn = (clientId) => ({
	type: ACTIONS.SET_CURRENT_TURN,
	payload: clientId,
});

export const setIsRoundStarted = (isRoundStarted) => ({
	type: ACTIONS.SET_IS_ROUND_STARTED,
	payload: isRoundStarted,
});

export const resetLobby = () => ({
	type: ACTIONS.LEAVE_lOBBY,
});

export const setIsSinging = (isSinging) => ({
	type: ACTIONS.SET_IS_SINGING,
	payload: isSinging,
});

export const setTurnResults = (turnResults) => ({
	type: ACTIONS.SET_TURN_RESULTS,
	payload: turnResults,
});

export const leaveLobby = (isHost) => {
	return (dispatch, getState) => {
		let { socket, roomCode } = getState().game;
		if (roomCode) {
			if (isHost) {
				emit.closeRoom(socket, roomCode);
			} else {
				emit.leaveRoom(socket, roomCode);
			}
		}
		dispatch(resetLobby());
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
			emit.createRoom(socket, isHost);
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
		let {
			isInLobby,
			isHost,
			socket,
			isGameStarted,
			roomCode,
		} = getState().game;
		if (!isGameStarted) {
			if ((isInLobby && roomCode, roomCode)) {
				await dispatch(leaveLobby(isHost));
			}
			socket.disconnect();
			dispatch(removeSocket());
		}
	};
};

export const joinRoomAction = (roomCode, alias) => {
	return (dispatch, getState) => {
		let { socket } = getState().game;
		emit.joinRoom(socket, { roomCode, alias });
		dispatch(setIsInLobby(true));
	};
};

export const hostStartGame = (socket, isHost, roomCode) => {
	if (isHost) {
		emit.startGame(socket, { roomCode: roomCode, isHost: isHost });
	}
};

export const closeGame = () => {
	return async (dispatch, getState) => {
		let { isHost, socket, isGameStarted } = getState().game;
		if (isGameStarted && isHost) {
			await dispatch(leaveLobby(isHost));
			socket.disconnect();
			dispatch(removeSocket());
		}
	};
};

export const gotTranscript = (transcript) => {
	return (dispatch, getState) => {
		let { socket, roomCode } = getState().game;
		emit.endTurn(socket, { roomCode, transcript });
		dispatch(setIsSinging(false));
	};
};

export const nextTurn = () => {
	return (dispatch, getState) => {
		let {
			socket,
			roomCode,
			clients,
			currentTurn,
			turnResults,
		} = getState().game;

		clients[currentTurn] = turnResults.score;

		emit.nextTurn(socket, { clients, roomCode, isHost });

		dispatch(setTurnResults(null));
		dispatch();
	};
};
