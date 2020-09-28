module.exports.getRoomByCode = function getRoomByCode(io, roomCode) {
	return io.sockets.adapter.rooms[roomCode];
};

module.exports.getNewRoom = function getNewRoom(existingRoomCodes) {
	do {
		newRoomCode = Math.random().toString(36).substr(2, 4);
	} while (getRoomByCode(existingRoomCodes, newRoomCode));

	existingRoomCodes.push(newRoomCode);

	return newRoomCode;
};
