import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../components/button";
import io from "socket.io-client";
import * as socketActions from "../../socket/socketActions";

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

//transfer these to state
const endpoint = "https://localhost:43020";

//connect to server and set up socket communication
const connectToServer = async (endpoint, setSocket) => {
    setSocket(io.connect(endpoint));
};

const createListeners = async (socket, setRoom, setTurn, setSing, isHost) => {
    if (socket) {
        socket.on("room info", roomData => {
            setRoom(roomData);
        });

        socket.on("client change", message => {
            console.log(message);
        });

        socket.on("room closed", () => {
            setRoom(null);
        });

        if (!isHost) {
            socket.on("take turn", () => {
                setTurn(true);
            });

            socket.on("sing", () => {
                setSing(true);
            });
        }
    }
};

export default function Lobby() {
    let router = useRouter();

    const [socket, setSocket] = React.useState(null);
    const [room, setRoom] = React.useState(null);
    const [turn, setTurn] = React.useState(false);
    const [sing, setSing] = React.useState(false);
    const [alias, setAlias] = React.useState("default");
    const [isHost, setHost] = React.useState(
        router.query.host && router.query.host === "true"
    );

    React.useEffect(connectToServer(endpoint, setSocket), []);
    React.useEffect(
        createListeners(socket, setRoom, setTurn, setSing, isHost),
        [socket]
    );
    if (isHost) {
        React.useEffect(socketActions.emitCreateRoom(socket), [socket]);
    }
    return (
        <div style={styles.container}>
            <h1 style={styles.text}>
                {isHost ? "You are a host!" : "You are a player!"}
            </h1>
            <h2 style={styles.text}>
                {isHost && room ? `your host code is ${room.roomCode}` : null}
            </h2>

            {isHost ? (
                <Link
                    href={{
                        pathname: "/game/playing",
                        query: {
                            host: router.query.host ? router.query.host : false
                        }
                    }}
                    as="/game/playing"
                >
                    <Button style={styles.button}>Play</Button>
                </Link>
            ) : (
                <Button
                    style={styles.button}
                    onClick={
                        room && socket && alias && isHost
                            ? socketActions.emitJoinRoom(
                                  socket,
                                  alias,
                                  room.roomCode,
                                  isHost
                              )
                            : () => {}
                    }
                >
                    join room
                </Button>
            )}
        </div>
    );
}
