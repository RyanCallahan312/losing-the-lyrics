const app = require("express")();
const next = require("next");
const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

io.on("connection", socket => {
    //create room
    socket.on("create room", isHost => {
        console.log("create room");
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
            if (room && room.playing == false) {
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

                socket.to(roomCode).emit("room closed");

                socket.disconnect(true);
            }
        }
    });

    //end turn
    socket.on("end turn", ({ roomCode, isHost, turnData }) => {
        console.log("end turn", { roomCode, isHost, turnData });
        if (!isHost) {
            let room = getRoomByCode(existingRooms, roomCode);

            room.host.emit("next turn", turnData); //tell host its time for the next turn

            room.nextTurn();
            room.currentTurn.emit("take turn", "placeholder transcript"); //tell next client in the queue its their turn
        }
    });

    //start singing
    socket.on("sing", ({ roomCode, isHost }) => {
        if (isHost) {
            let room = getRoomByCode(existingRooms, roomCode);

            room.currentTurn.emit("sing"); //tell the current turn client to start singing
        }
    });

    socket.on("game start", ({ roomCode, isHost }) => {
        console.log("game start", { roomCode, isHost });
        if (isHost) {
            let room = getRoomByCode(existingRooms, roomCode);
            if (room) {
                socket.to(roomCode).emit("game start");
                room.startGame();
                room.currentTurn.emit("take turn");
            }
        }
    });

    socket.on("game end", ({ roomCode, isHost }) => {
        if (isHost) {
            let room = getRoomByCode(existingRooms, roomCode);
            if (room) {
                socket.to(roomCode).emit("game start");
            }
        }
    });

    socket.on("disconnect", reason => {
        console.log(`${socket.id} ${reason}`);
    });
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
        if (this.clients.length > 0) {
            this.currentTurn = this.clients[0];
        }
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
        //all nextjs pages
        app.get("*", (req, res) => {
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
