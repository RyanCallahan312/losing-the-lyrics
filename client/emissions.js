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

export function startRound(socket, data) {
	console.log(`starting round`);
	socket.emit(EMISSIONS.START_ROUND, data);
}

export function stopSong(socket, data) {
	console.log(`announcing Stop Song`);
	socket.emit(EMISSIONS.STOP_SONG, data);
}

export function endTurn(socket, data) {
	console.log(`End Turn`);
	socket.emit(EMISSIONS.END_TURN, data);
}

export function selectSong(socket, data){
	console.log(`selecting song ${data.songData}`)
	socket.emit(EMISSIONS.SELECT_SONG, data)
}
