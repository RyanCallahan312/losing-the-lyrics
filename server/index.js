const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const socketApp = express();
const socketServer = require("http").Server(socketApp);
const io = require("socket.io")(socketServer);

socketServer.listen(43020);

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
        this.clients.filter(client => client !== socket);
    }

    removeAllClients() {
        this.clients.forEach(client => {
            io.sockets.socket(client.id).leave(this.roomCode);
        });
        this.clients = null;
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
    //create room
    socket.on("create room", isHost => {
        if (isHost) {
            roomCode = getNewRoom(existingRooms, socket); //create new room object

            socket.join(roomCode); //join socket room

            let room = getRoomByCode(existingRooms, roomCode);
            socket.emit("room info", {
                roomCode: room.roomCode,
                clients: []
            }); //send back the room info
        }
    });

    //join room
    socket.on("join room", ({ alias, roomCode, isHost }) => {
        if (!isHost) {
            socket.join(roomCode); //join the socket room

            socket.alias = alias;
            getRoomByCode(existingRooms, roomCode).addClient(socket); //join the object room

            let room = getRoomByCode(existingRooms, roomCode);
            socket.emit("room info", {
                roomCode: room.roomCode,
                clients: room.clients.map(item => item.alias)
            });

            socket.to(roomCode).emit("client change", `${alias} has joined`); //announce to room that client has joined
        }
    });

    //leave room
    socket.on("leave room", ({ roomCode, isHost }) => {
        if (!isHost) {
            socket.leave(roomCode); //leave socket room
            getRoomByCode(existingRooms, roomCode).removeClient(socket); //leave object room
            socket
                .to(roomCode)
                .emit("client change", `${socket.alias} has left the room`); //announce client leaving
        }
    });

    //close room
    socket.on("close room", ({ roomCode, isHost }) => {
        if (isHost) {
            removeExistingRoom(roomCode); //remove room

            socket.to(roomCode).emit("room closed");
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
});

//helper methods
const getRoomByCode = (rooms, roomCode) => {
    var room = rooms.forEach(element => {
        if (element.roomCode === roomCode) {
            return element;
        }
    });
    return room ? room : null;
};

function getNewRoom(existingRooms, socket) {
    do {
        newRoomCode = Math.random()
            .toString(36)
            .substr(2, 4);
    } while (
        existingRooms.length > 0 &&
        existingRooms.reduce((accumulator, item) =>
            item.roomCode === newRoomCode ? accumulator + 1 : accumulator
        ) !== 0
    );

    existingRooms.push(new Room(newRoomCode, socket));

    return newRoomCode;
}

function removeExistingRoom(existingRooms, roomCode) {
    getRoomByCode(roomCode).removeAllClients();
    existingRooms.filter(item => item.roomCode !== roomCode);
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
