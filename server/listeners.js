const EMISSIONS = require('./emissions');
const utils = require('./utils');

module.exports = function createListeners(socket, io) {
	socket.on(EMISSIONS.CREATE_ROOM, (isHost) => {
		console.log(`${socket.id} ${EMISSIONS.CREATE_ROOM}`);
		if (isHost) {
			//init host socket fields
			socket.isHost = true;
			socket.alias = 'HOST 😎';
			socket.color = null;
			socket.score = null;

			//create new room
			let roomCode = utils.getNewRoom(io.existingRoomCodes);

			//join socket room
			socket.join(roomCode);

			//init room fields
			let room = utils.getRoomByCode(io, roomCode);
			room.host = socket;
			room.clients = [
				{
					socketId: socket.id,
					isHost: socket.isHost,
					alias: socket.alias,
					color: socket.color,
					score: socket.score,
				},
			];
			room.turnOrder = [];
			room.currentTurn = null;
			room.roundNumber = 0;
			room.isRoundStarted = false;
			room.songData = null;

			//room info
			io.to(roomCode).emit(EMISSIONS.ROOM_INFO, {
				roomCode: roomCode,
				clients: room.clients,
				turnOrder: room.turnOrder,
				currentTurn: room.currentTurn,
				roundNumber: room.roundNumber,
				isRoundStarted: room.isRoundStarted,
			});
		} else {
			//error res if not host
			io.to(socket.id).emit(
				EMISSIONS.ERROR_RESPONSE,
				'SOCKET_PERMISSIONS_ERROR: players may not create rooms',
			);
		}
	});

	socket.on(EMISSIONS.CLOSE_ROOM, (roomCode) => {
		console.log(`${socket.id} ${EMISSIONS.CLOSE_ROOM}`);
		if (roomCode) {
			if (socket.isHost) {
				let room = utils.getRoomByCode(io, roomCode);
				let hostClient = room.clients.find(
					(client) => client.socketId === socket.id,
				);
				if (hostClient && hostClient.isHost) {
					io.to(roomCode).emit(EMISSIONS.CLOSE_ROOM);

					Object.keys(room.sockets).forEach((socketId) => {
						io.sockets.connected[socketId].leave(room.roomCode);
					});
				}
				delete io.sockets.adapter.rooms[roomCode];
			} else {
				//error res if not host
				io.to(socket.id).emit(
					EMISSIONS.ERROR_RESPONSE,
					'SOCKET_PERMISSIONS_ERROR: players may not close rooms',
				);
			}
		} else {
			io.to(socket.id).emit(
				EMISSIONS.ERROR_RESPONSE,
				'ROOM_CODE_ERROR: room code required',
			);
		}
	});

	socket.on(EMISSIONS.JOIN_ROOM, ({ roomCode, alias }) => {
		console.log(`${socket.id} ${EMISSIONS.JOIN_ROOM}`);

		if (
			io.sockets.adapter.rooms[roomCode] &&
			io.sockets.adapter.rooms[roomCode].roundNumber === 0
		) {
			socket.join(roomCode);

			socket.isHost = false;
			socket.alias = alias;
			socket.color = 360 * Math.random();
			socket.score = 0;

			let room = utils.getRoomByCode(io, roomCode);

			room.clients.push({
				socketId: socket.id,
				isHost: socket.isHost,
				alias: socket.alias,
				color: socket.color,
				score: socket.score,
			});

			room.turnOrder.push(socket.id);

			io.to(roomCode).emit(EMISSIONS.ROOM_INFO, {
				roomCode: roomCode,
				clients: room.clients,
				turnOrder: room.turnOrder,
				currentTurn: room.currentTurn,
				roundNumber: room.roundNumber,
				isRoundStarted: room.isRoundStarted,
			});
		}
	});

	socket.on(EMISSIONS.LEAVE_ROOM, (roomCode) => {
		console.log(`${socket.id} ${EMISSIONS.LEAVE_ROOM}`);

		let room = utils.getRoomByCode(io, roomCode);
		let client = room.clients.find((c) => c.socketId === socket.id);

		if (client) {
			socket.leave(roomCode);

			room.clients.splice(
				room.clients.findIndex((c) => c.socketId === socket.id),
				1,
			);

			io.to(roomCode).emit(EMISSIONS.ROOM_INFO, {
				roomCode: roomCode,
				clients: room.clients,
				turnOrder: room.turnOrder,
				currentTurn: room.currentTurn,
				roundNumber: room.roundNumber,
				isRoundStarted: room.isRoundStarted,
			});
		}
	});

	socket.on(EMISSIONS.GAME_START, ({ roomCode, isHost }) => {
		console.log(`${socket.id} ${EMISSIONS.GAME_START}`);
		if (isHost && io.sockets.adapter.rooms[roomCode]) {
			io.sockets.adapter.rooms[roomCode].roundNumber += 1;
			io.to(roomCode).emit(EMISSIONS.GAME_START);
		} else {
			io.to(socket.id).emit(
				EMISSIONS.ERROR_RESPONSE,
				'SOCKET_PERMISSIONS_ERROR: players may not start games',
			);
		}
	});

	socket.on(EMISSIONS.START_ROUND, ({ roomCode, isHost }) => {
		console.log(`${socket.id} ${EMISSIONS.START_ROUND}`);
		if (isHost) {
			let room = utils.getRoomByCode(io, roomCode);
			room.isRoundStarted = true;
			room.roundNumber += 1;
			room.currentTurn = room.turnOrder[0];
			io.to(roomCode).emit(EMISSIONS.ROOM_INFO, {
				roomCode: roomCode,
				clients: room.clients,
				turnOrder: room.turnOrder,
				currentTurn: room.currentTurn,
				roundNumber: room.roundNumber,
				isRoundStarted: room.isRoundStarted,
			});
			io.to(room.host.id).emit(EMISSIONS.PLAY_SONG);
		} else {
			io.to(socket.id).emit(
				EMISSIONS.ERROR_RESPONSE,
				'SOCKET_PERMISSIONS_ERROR: players may not start rounds',
			);
		}
	});

	socket.on(EMISSIONS.SELECT_SONG, ({ isHost, roomCode, songData }) => {
		console.log(`${socket.id} ${EMISSIONS.SELECT_SONG}`);
		if (isHost) {

			let room = utils.getRoomByCode(io, roomCode);
			room.songData = songData;
		}
	});

	socket.on(EMISSIONS.STOP_SONG, ({ isHost, roomCode }) => {
		console.log(`${socket.id} ${EMISSIONS.STOP_SONG}`);
		if (isHost) {
			let room = utils.getRoomByCode(io, roomCode);
			io.to(room.currentTurn).emit(EMISSIONS.START_SING);
		} else {
			io.to(socket.id).emit(
				EMISSIONS.ERROR_RESPONSE,
				'SOCKET_PERMISSIONS_ERROR: players may not announce the song has stopped',
			);
		}
	});

	socket.on(EMISSIONS.NEXT_TURN, ({ isHost, roomInfo, roomCode }) => {
		console.log(`${socket.id} ${EMISSIONS.END_TURN}`);
		console.log(`transcript: ${transcript}`);
	});

	socket.on(EMISSIONS.END_TURN, ({ roomCode, transcript }) => {
		console.log(`${socket.id} ${EMISSIONS.END_TURN}`);
		let room = utils.getRoomByCode(io, roomCode);

		if (socket.id == room.currentTurn) {

			let turnData = {};

			turnData.score = utils.getScore(
				transcript,
				room.songData.answer,
			);
			turnData.transcript = transcript;

			io.to(room.host.id).emit(EMISSIONS.END_TURN, turnData);
		} else {
			io.to(socket.id).emit(
				EMISSIONS.ERROR_RESPONSE,
				'SOCKET_PERMISSIONS_ERROR: players may only end turn on their turn',
			);
		}
	});

	socket.on(EMISSIONS.DISCONNECT, (reason) => {
		console.log(`${socket.id} ${reason}`);
	});
};
