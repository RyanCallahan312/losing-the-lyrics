const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const socketApp = express();
const socketServer = require("http").Server(socketApp);
const io = require("socket.io")(socketServer);

socketServer.listen(80);

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
    socket.on("join room", data => {
        if (data.isHost) {
            room = getNewRoom(existingRooms);
            socket.join(room.roomCode);
            socket.emit(room);
        } else {
            socket.join(data.roomCode);
            socket.emit(roomInfo);
        }
    });

    socket.on("button press", data => {
        console.log(data);
    });

    socket.on("close room", roomCode => {
        removeExistingRoom(roomCode);
    });
});

function getNewRoom(existingRooms) {
    do {
        newRoomId = Math.random()
            .toString(36)
            .substr(2, 4);
    } while (existingRooms.filter(item => item.roomCode === newRoomId) > 0);

    existingRooms.push(existingRooms);

    return newRoomId
}

function removeExistingRoom(existingRooms, roomCode) {
    existingRooms = existingRooms.filter(item => item.roomCode !== roomCode);
}

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
