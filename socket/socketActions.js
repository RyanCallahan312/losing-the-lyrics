export const emitEndTurn = async (socket, turnData, roomCode) => {
    socket.emit("end turn", {
        turnData: turnData,
        roomCode: roomCode,
        isHost: isHost
    });
};

export const emitSing = async (socket, roomCode, isHost) => {
    socket.emit("sing", { roomCode: roomCode, isHost: isHost });
};

export const emitCloseRoom = async (socket, roomCode, isHost) => {
    socket.emit("close room", { roomCode: roomCode, isHost: isHost });
};

export const emitLeaveRoom = async (socket, roomCode, isHost) => {
    socket.emit("leave room", { roomCode: roomCode, isHost: isHost });
};

export const emitJoinRoom = async (socket, alias, roomCode, isHost) => {
    socket.emit("join room", {
        alias: alias,
        roomCode: roomCode,
        isHost: isHost
    });
};

export const emitCreateRoom = async (socket, isHost) => {
    if (socket) {
        socket.emit("create room", { isHost: isHost });
    }
};
