const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const socketApp = express();
const socketServer = require("http").Server(socketApp);
const io = require("socket.io")(socketServer);

socketServer.listen(43020, () => {
    console.log("listening on 43020");
});

//room class
class Room {
    constructor(roomCode, host) {
        this.roomCode = roomCode;
        this.clients = [];
        this.host = host;
        this.currentTurn = null;
        this.playing = false;
    }

    addClient(socket) {
        this.clients.push(socket);
    }

    removeClient(socket) {
        this.clients = this.clients.filter(client => client !== socket);
    }

    startGame() {
        this.playing = true;
    }

    nextTurn() {
        let index = this.clients.indexOf(this.currentTurn);
        if (index !== this.clients.length - 1) {
            this.currentTurn = this.clients[index + 1];
        } else {
            this.currentTurn = this.clients[0];
        }
    }
}

var existingRooms = [];

//socket
io.on("connection", socket => {
    console.log(`${socket.socketId} Connected`)
    //create room
    socket.on("create room", isHost => {
        console.log(`CALLED ${isHost}`);
        if (isHost) {
            roomCode = getNewRoom(existingRooms, socket); //create new room object

            socket.join(roomCode); //join socket room

            io.to(roomCode).emit("room info", {
                roomCode: roomCode,
                clients: []
            });
            //send back the room info
        }
    });

    //join room
    socket.on("join room", ({ alias, roomCode, isHost }) => {
        if (!isHost) {
            let room = getRoomByCode(existingRooms, roomCode); //join the object room
            if (room) {
                socket.join(roomCode); //join the socket room

                socket.alias = alias;
                socket.score = 0;
                room.addClient(socket);

                io.to(room.roomCode).emit("room info", {
                    roomCode: room.roomCode,
                    clients: room.clients.map(item => {
                        return { alias: item.alias, score: item.score };
                    })
                });

                socket
                    .to(roomCode)
                    .emit("client change", `${alias} has joined`); //announce to room that client has joined
            }
        }
    });

    //leave room
    socket.on("leave room", ({ roomCode, isHost }) => {
        console.log("leave room");
        if (!isHost) {
            let room = getRoomByCode(existingRooms, roomCode); //leave object room
            if (room) {
                socket.leave(roomCode); //leave socket room
                room.removeClient(socket);
                socket
                    .to(roomCode)
                    .emit("client change", `${socket.alias} has left the room`); //announce client leaving

                io.to(room.roomCode).emit("room info", {
                    roomCode: room.roomCode,
                    clients: room.clients.map(item => {
                        return { alias: item.alias, score: item.score };
                    })
                });
            }

            socket.disconnect(true);
        }
    });

    //close room
    socket.on("close room", ({ roomCode, isHost }) => {
        console.log("close room");
        if (isHost) {
            let room = getRoomByCode(existingRooms, roomCode);
            if (room) {
                socket.leave(roomCode);

                existingRooms = removeExistingRoom(existingRooms, roomCode, io); //remove room

                io.in(roomCode).clients((err, socketIds) => {
                    if (err) throw err;
                    socketIds.forEach(socketId => console.log(socketId));
                });

                socket.to(roomCode).emit("room closed");

                socket.disconnect(true);
            }
        }
    });

    //end turn
    socket.on("end turn", ({ roomCode, isHost, turnData }) => {
        if (!isHost) {
            let room = getRoomByCode(existingRooms, roomCode);

            io.sockets.socket(room.host.id).emit("next turn", turnData); //tell host its time for the next turn

            room.nextTurn();
            io.sockets.socket(currentTurn.id).emit("take turn", {}); //tell next client in the queue its their turn
        }
    });

    //start singing
    socket.on("sing", ({ roomCode, isHost }) => {
        if (isHost) {
            let room = getRoomByCode(existingRooms, roomCode);

            io.sockets.socket(room.currentTurn.id).emit("sing", {}); //tell the current turn client to start singing
        }
    });

    socket.on("disconnect", reason => {
        console.log(`${socket.id} ${reason}`);
    });
});

//helper methods
const getRoomByCode = (rooms, roomCode) => {
    var room = rooms.find(element => element.roomCode === roomCode);
    return room ? room : null;
};

function getNewRoom(existingRooms, socket) {
    do {
        newRoomCode = Math.random()
            .toString(36)
            .substr(2, 4);
    } while (getRoomByCode(existingRooms, newRoomCode));

    existingRooms.push(new Room(newRoomCode, socket));

    return newRoomCode;
}

function removeExistingRoom(existingRooms, roomCode) {
    let room = getRoomByCode(existingRooms, roomCode);
    if (room) {
        return existingRooms.filter(element => element.roomCode !== roomCode);
    } else {
        return existingRooms;
    }
}

//endpoints
nextApp
    .prepare()
    .then(() => {
        const server = express();

        //all nextjs pages
        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on ${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
