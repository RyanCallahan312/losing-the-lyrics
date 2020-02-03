import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../components/button";
import io from "socket.io-client";

const styles = {
    container: {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    button: {
        width: "100%",
        minWidth: "200px",
        flexBasis: "100%"
    },
    text: {
        flexBasis: "100%"
    }
};

// function createRoom(socket, isHost) {
//     socket.emit("create room", isHost);
// }

// function createListeners(isHost, socket, setRoom) {
//     if (socket) {
//         socket.on("room info", data => {
//             setRoom(data);
//         });

//         socket.on("client change", data => console.log(data));

//         socket.on("room closed", () => console.log("room closed"));

//         if (isHost) {
//             socket.on("next turn", data => {
//                 //change turns for host
//                 console.log("next turn");
//             });

//             createRoom(socket, isHost);
//         } else {
//             socket.on("take turn", data => {
//                 //end turn
//                 console.log("take turn");
//             });

//             socket.on("sing", data => {
//                 //sing
//                 console.log("sing");
//             });
//         }
//     }
// }

export default function Lobby(props) {
    const createListeners = (isHost, socket, setRoom) => {
        if (socket) {
            socket.on("room info", data => {
                setRoom(data);
            });

            socket.on("client change", data => console.log(data));

            socket.on("room closed", () => console.log("room closed"));
            if (isHost) {
                socket.on("next turn", data => {
                    //change turns for host
                    console.log("next turn");
                });
            } else {
                socket.on("take turn", data => {
                    //end turn
                    console.log("take turn");
                });

                socket.on("sing", data => {
                    //sing
                    console.log("sing");
                });
            }
        }
    };

    const connectSocket = () => {
        const endpoint = "http://localhost:43020";
        return io.connect(endpoint);
    };

    const disconnectSocket = (socket, isHost, roomCode) => {
        console.log({ socket, roomCode, isHost });
        if (roomCode) {
            if (isHost) {
                socket.emit("close room", { isHost, roomCode });
            } else {
                socket.emit("leave room", { isHost, roomCode });
            }
        }
        socket.disconnect(true);
    };

    const createRoom = isHost => {
        socket.emit("create room", isHost);
    };

    const joinRoom = roomCode => {
        console.log("joined");
    };

    const router = useRouter();

    const [isHost, setIsHost] = React.useState(
        router.query.host && router.query.host == "true" ? true : false
    );
    const [socket, setSocket] = React.useState(connectSocket());
    const [room, setRoom] = React.useState(null);
    const roomCode = React.useMemo(
        () => (room && room.roomCode ? room.roomCode : null),
        [room]
    );

    React.useEffect(() => () => disconnectSocket(socket, isHost, roomCode), [roomCode]);
    React.useEffect(() => createListeners(isHost, socket, setRoom), [socket]);

    return (
        <div style={styles.container}>
            {roomCode ? <p>room code {roomCode}</p> : null}
            {isHost ? (
                <button onClick={() => createRoom(isHost)}>
                    create a room
                </button>
            ) : (
                <button onClick={() => joinRoom(roomCode)}>join a room</button>
            )}
        </div>
    );
}
