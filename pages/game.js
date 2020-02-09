import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/button";
import io from "socket.io-client";

const styles = {
    container: {
        height: "50vh",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    button: {
        maxWidth: "100%",
        width: "90%",
        margin: "5%"
    },
    text: {
        flexBasis: "100%"
    },
    input: {
        fontFamily: "Teko",
        outline: "none",
        padding: "10px",
        textAlign: "center",
        border: "2px solid rgba(39,134,255, 1)",
        borderRadius: "20px",
        margin: "10px",
        color: "rgba(50,138,250, 1)",
        fontSize: "20px"
    },
    roomCodeLabel: {
        border: "rgba(50,138,250, 1)",
        background: "rgba(50,138,250, 1)",
        fontFamily: "Teko",
        fontSize: "30px",
        color: "rgba(255,255,255, 1)",
        width: "100%",
        margin: "0",
        padding: "8px 0px 8px 0px",
        borderRadius: "10px"
    },
    roomCode: {
        fontSize: "40px",
        color: "rgba(255,255,255, 1)"
    }
};
const createListeners = (
    isHost,
    socket,
    setRoom,
    setSing,
    setTurn,
    setIsPlaying
) => {
    if (socket) {
        socket.on("room info", data => {
            console.log("room info", data);
            setRoom(data);
        });

        socket.on("client change", data => console.log(data));

        socket.on("room closed", () => setRoom(null));
        if (isHost) {
            socket.on("next turn", data => {
                //change turns for host
                console.log("next turn");
            });
        } else {
            socket.on("take turn", () => setTurn(true));

            socket.on("sing", () => setSing(true));
        }
    }
};

const connectSocket = () => {
    endpoint = "http://losing-the-lyrics.herokuapp.com:43020";

    return io(endpoint);
};

const disconnectSocket = (socket, isHost, roomCode) => {
    if (roomCode) {
        if (isHost) {
            socket.emit("close room", { isHost, roomCode });
        } else {
            socket.emit("leave room", { isHost, roomCode });
        }
    }
};

const createRoom = (isHost, socket) => {
    socket.emit("create room", isHost);
};

const joinRoom = (inputCode, socket, isHost, alias) => {
    socket.emit("join room", {
        alias,
        roomCode: inputCode,
        isHost
    });
};

export default function game(props) {
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
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isSinging, setIsSinging] = React.useState(false);
    const [isTurn, setIsTurn] = React.useState(false);
    const clientsDom = React.useMemo(() => {
        if (room) {
            return (
                <ul>
                    {room.clients.map((item, i) => (
                        <li key={i}>
                            {item.alias} : {item.score}
                        </li>
                    ))}
                </ul>
            );
        } else {
            null;
        }
    }, [room]);
    const [inputCode, setInputCode] = React.useState("");
    const [alias, setAlias] = React.useState("");

    React.useEffect(() => () => disconnectSocket(socket, isHost, roomCode), [
        roomCode
    ]);
    React.useEffect(() => createListeners(isHost, socket, setRoom), [socket]);

    return (
        <div style={{ textAlign: "center", margin: "0px 40% 0px 40%" }}>
            {roomCode ? (
                <h1 style={styles.roomCodeLabel}>
                    Room Code: <span style={styles.roomCode}>{roomCode}</span>
                </h1>
            ) : null}
            <div style={styles.container}>
                {roomCode ? (
                    clientsDom
                ) : isHost ? (
                    <div>
                        <Button
                            onClick={() => createRoom(isHost, socket)}
                            style={{
                                ...styles.button,
                                minWidth: "15vw",
                                margin: "0px"
                            }}
                        >
                            create a room
                        </Button>
                    </div>
                ) : (
                    <div>
                        <input
                            onChange={e => setInputCode(e.target.value)}
                            value={inputCode}
                            placeholder={"Room Code"}
                            style={styles.input}
                        />
                        <br />
                        <input
                            onChange={e => setAlias(e.target.value)}
                            value={alias}
                            placeholder={"Alias"}
                            style={styles.input}
                        />
                        <br />
                        <Button
                            onClick={() =>
                                joinRoom(inputCode, socket, isHost, alias)
                            }
                            style={styles.button}
                        >
                            join room
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
