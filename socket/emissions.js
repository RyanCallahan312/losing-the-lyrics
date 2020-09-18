import * as EMISSIONS from '../constants/emissions';

export function createRoom(socket, isHost) {
	console.log('creating room');
	socket.emit(EMISSIONS.CREATE_ROOM, isHost);
}

export function closeRoom(socket, roomCode) {
	console.log(`closing room ${roomCode}`);
	socket.emit(EMISSIONS.CLOSE_ROOM, roomCode);
}

export function joinRoom(socket, data) {
	console.log(`joining room ${data.roomCode} as ${data.alias}`);
	socket.emit(EMISSIONS.JOIN_ROOM, data);
}

export function leaveRoom(socket, data) {
	console.log(`leaving room ${data.roomCode}`);
	socket.emit(EMISSIONS.LEAVE_ROOM, data);
}

export function startGame(socket, data) {
	console.log(`starting game`);
	socket.emit(EMISSIONS.GAME_START, data);
}
