const EMISSIONS = require('./emissions');

function createListeners(socket, io) {
	socket.on(EMISSIONS.CREATE_ROOM, (isHost) => {
		console.log(`${socket.id} ${EMISSIONS.CREATE_ROOM}`);
		if (isHost) {
			//init host socket fields
			socket.isHost = true;
			socket.alias = 'HOST 😎';
			socket.score = null;

			//create new room
			roomCode = getNewRoom(io.existingRoomCodes);

			//join socket room
			socket.join(roomCode);

			//init room fields
			let room = io.sockets.adapter.rooms[roomCode];
			room.host = socket;
			room.clients = [
				{
					socketId: socket.id,
					isHost: socket.isHost,
					alias: socket.alias,
					score: socket.score,
				},
			];
			room.turnOrder = [];
			room.currentTurn = null;
			room.roundNumber = 0;

			//room info
			io.to(roomCode).emit(EMISSIONS.ROOM_INFO, {
				roomCode: roomCode,
				clients: room.clients,
				turnOrder: room.turnOrder,
				currentTurn: room.currentTurn,
				roundNumber: room.roundNumber,
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
				let room = io.sockets.adapter.rooms[roomCode];
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
			socket.score = 0;

			let room = io.sockets.adapter.rooms[roomCode];

			room.clients.push({
				socketId: socket.id,
				isHost: socket.isHost,
				alias: socket.alias,
				score: socket.score,
			});

			room.turnOrder.push(socket.id);

			io.to(roomCode).emit(EMISSIONS.ROOM_INFO, {
				roomCode: roomCode,
				clients: room.clients,
				turnOrder: room.turnOrder,
				currentTurn: room.currentTurn,
				roundNumber: room.roundNumber,
			});
		}
	});

	socket.on(EMISSIONS.LEAVE_ROOM, (roomCode) => {
		console.log(`${socket.id} ${EMISSIONS.LEAVE_ROOM}`);

		let room = io.sockets.adapter.rooms[roomCode];
		let client = room.clients.find(
			(client) => client.socketId === socket.id,
		);

		if (client) {
			socket.leave(roomCode);

			room.clients.splice(
				room.clients.findIndex(
					(client) => client.socketId === socket.id,
				),
				1,
			);

			io.to(roomCode).emit(EMISSIONS.ROOM_INFO, {
				roomCode: roomCode,
				clients: room.clients,
				turnOrder: room.turnOrder,
				currentTurn: room.currentTurn,
				roundNumber: room.roundNumber,
			});
		}
	});

	socket.on(EMISSIONS.GAME_START, ({ roomCode, isHost }) => {
		console.log(`${socket.id} ${EMISSIONS.GAME_START}`);
		if (isHost && io.sockets.adapter.rooms[roomCode]) {
			io.sockets.adapter.rooms[roomCode].roundNumber += 1;
			io.to(roomCode).emit(EMISSIONS.GAME_START);
		}
	});

	socket.on(EMISSIONS.DISCONNECT, (reason) => {
		console.log(`${socket.id} ${reason}`);
	});
}

function getRoomByCode(rooms, newRoomCode) {
	var room = rooms.find(
		(existingRoomCode) => existingRoomCode === newRoomCode,
	);
	return room ? room : null;
}

function getNewRoom(existingRoomCodes) {
	do {
		newRoomCode = Math.random().toString(36).substr(2, 4);
	} while (getRoomByCode(existingRoomCodes, newRoomCode));

	existingRoomCodes.push(newRoomCode);

	return newRoomCode;
}

module.exports = createListeners;
