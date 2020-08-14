import * as ACTIONS from '../../constants/actions';
import bindListeners from '../../socket/listeners';
import { createRoom, closeRoom } from '../../socket/emissions';

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
			console.log('creating lobby');
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

export const disconnectFromServer = () => {
	console.log('starting disconnect');
	return async (dispatch, getState) => {
		let { isInLobby, isHost, socket } = getState().game;
		if (isInLobby) {
			console.log('leaving lobby');
			await dispatch(leaveLobby(isHost));
			console.log('left lobby');
		}
		console.log('disconnecting from server');
		socket.disconnect();
		dispatch(removeSocket());
	};
};

export const joinRoom = ({ clients, currentTurn, roomCode, roundNumber }) => {
	//reducer to set room info
};

/*
const createListeners = (
	isHost,
	socket,
	setRoom,
	setIsSinging,
	setIsTurn,
	setIsPlaying
) => {
	if (socket) {
		socket.on('room info', (data) => {
			console.log('room info', data);
			setRoom(data);
		});

		socket.on('client change', (data) => console.log(data));

		socket.on('room closed', () => {
			setRoom(null);
			setIsSinging(false);
			setIsPlaying(false);
			setIsTurn(false);
			socket.disconnect();
			socket = io();
		});

		socket.on('game start', () => setIsPlaying(true));

		socket.on('game end', () => setIsPlaying(false));

		if (isHost) {
			socket.on('next turn', (data) => {
				//change turns for host
				console.log('next turn', data);
			});
		} else {
			socket.on('take turn', () => setIsTurn(true));

			socket.on('sing', () => setIsSinging(true));
		}
	}
};

const connectSocket = () => {
	return io();
};

const disconnectSocket = (socket, isHost, roomCode) => {
	if (roomCode) {
		if (isHost) {
			socket.emit('close room', { isHost, roomCode });
		} else {
			socket.emit('leave room', { isHost, roomCode });
		}
	}
};

const createRoom = (isHost, socket) => {
	socket.emit('create room', isHost);
};

const joinRoom = (inputCode, socket, isHost, alias) => {
	socket.emit('join room', {
		alias,
		roomCode: inputCode,
		isHost,
	});
};

const startGame = (socket, roomCode, isHost, setIsPlaying) => {
	socket.emit('game start', {
		roomCode: roomCode,
		isHost: isHost,
	});
	setIsPlaying(true);
};

const endGame = (socket, roomCode, isHost) => {
	socket.emit('game end', {
		roomCode,
		isHost,
	});
};

const endTurn = (
	socket,
	roomCode,
	isHost,
	turnData,
	setIsSinging,
	setIsTurn
) => {
	setIsTurn(false);
	setIsSinging(false);
	socket.emit('end turn', { roomCode, isHost, turnData });
};

const startSing = (socket, roomCode, isHost) => {
	socket.emit('sing', { roomCode, isHost });
};

*/
