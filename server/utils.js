function getRoomByCode(io, roomCode) {
	if (io.sockets && io.sockets.adapter && io.sockets.adapter.rooms) {
		return io.sockets.adapter.rooms[roomCode];
	}
	return null;
}

function getNewRoom(existingRoomCodes) {
	do {
		newRoomCode = Math.random().toString(36).substr(2, 4);
	} while (getRoomByCode(existingRoomCodes, newRoomCode));

	existingRoomCodes.push(newRoomCode);

	return newRoomCode;
}

module.exports.getRoomByCode = getRoomByCode;
module.exports.getNewRoom = getNewRoom;
