import { useRouter } from "next/router";
import Button from "../components/button";
import io from "socket.io-client";
import Game from "../components/gamePanel";

const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";
const spotifyClientId = "aeb75c365a594462a967bcb106a55be9";
const spotifyResponseType = "token";
const redirectUri =
    "https:%2F%2Flosing-the-lyrics.herokuapp.com%2Fgame?host=true";

const styles = {
    container: {
        height: "35vh",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    button: {
        maxWidth: "100%",
        width: "-webkit-fill-available",
        margin: "5px"
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
        margin: "0px",
        background: "rgb(255, 255, 255)",
        fontFamily: "Teko",
        fontSize: "calc(2.2vw + 16px)",
        color: "rgb(161, 210, 255)",
        padding: "8px 0px",
        textShadow: "2px 2px black"
    },
    roomCode: {
        letterSpacing: "5px"
    },
    client: {
        fontFamily: "Teko",
        color: "rgba(102, 85, 255, 0.84)",
        fontSize: "28px"
    }
};
const createListeners = (
    isHost,
    socket,
    setRoom,
    setIsSinging,
    setIsTurn,
    setIsPlaying
) => {
    if (socket) {
        socket.on("room info", data => {
            console.log("room info", data);
            setRoom(data);
        });

        socket.on("client change", data => console.log(data));

        socket.on("room closed", () => {
            setRoom(null);
            setIsSinging(false);
            setIsPlaying(false);
            setIsTurn(false);
            socket.disconnect();
            socket = io();
        });

        socket.on("game start", () => setIsPlaying(true));

        socket.on("game end", () => setIsPlaying(false));

        if (isHost) {
            socket.on("next turn", data => {
                //change turns for host
                console.log("next turn", data);
            });
        } else {
            socket.on("take turn", () => setIsTurn(true));

            socket.on("sing", () => setIsSinging(true));
        }
    }
};

const connectSocket = () => {
    return io();
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

const startGame = (socket, roomCode, isHost, setIsPlaying) => {
    socket.emit("game start", {
        roomCode: roomCode,
        isHost: isHost
    });
    setIsPlaying(true);
};

const endGame = (socket, roomCode, isHost) => {
    socket.emit("game end", {
        roomCode,
        isHost
    });
};

const endTurn = (
    socket,
    roomCode,
    isHost,
    turnData,
    setIsSinging,
    setIsTurn
) => {
    setIsTurn(false);
    setIsSinging(false);
    socket.emit("end turn", { roomCode, isHost, turnData });
};

const startSing = (socket, roomCode, isHost) => {
    socket.emit("sing", { roomCode, isHost });
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
    const [transcript, setTranscript] = React.useState("");
    const clientsDom = React.useMemo(() => {
        if (room) {
            return (
                <ul style={{ listStyle: "none", padding: "0px" }}>
                    {room.clients.map((item, i) => (
                        <li style={styles.client} key={i}>
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
    const [accessToken, setAccessToken] = React.useState(null);

    React.useEffect(() => {
        const spotifyHash =
            window.location.hash
                .substring(1)
                .split("&")
                .map(v => v.split("="))
                .reduce(
                    (pre, [key, value]) => ({ ...pre, [key]: value }),
                    {}
                ) || "no fragment";

        if (!(spotifyHash && spotifyHash.access_token)) {
            window.location.href = `${spotifyAuthEndpoint}?client_id=${spotifyClientId}&redirect_uri=${redirectUri}&response_type=${spotifyResponseType}`;
        } else {
            setAccessToken(spotifyHash.accessToken);
        }
        setIsHost(new URLSearchParams(window.location.search).get("host"));
    }, []);
    React.useEffect(() => () => disconnectSocket(socket, isHost, roomCode), [
        roomCode
    ]);
    React.useEffect(
        () =>
            createListeners(
                isHost,
                socket,
                setRoom,
                setIsSinging,
                setIsTurn,
                setIsPlaying
            ),
        [socket]
    );

    return (
        <div style={{ textAlign: "center" }}>
            {roomCode ? (
                <h1 style={styles.roomCodeLabel}>
                    Room Code: <span style={styles.roomCode}>{roomCode}</span>
                </h1>
            ) : null}

            <div style={styles.container}>
                {roomCode ? (
                    <Game
                        clients={clientsDom}
                        isTurn={isTurn}
                        isPlaying={isPlaying}
                        isHost={isHost}
                        isSinging={isSinging}
                        handleDidSing={e =>
                            endTurn(
                                socket,
                                roomCode,
                                isHost,
                                e,
                                setIsSinging,
                                setIsTurn
                            )
                        }
                    />
                ) : isHost ? (
                    <div>
                        <Button
                            onClick={() => createRoom(isHost, socket)}
                            style={{
                                ...styles.button
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

                {isHost && room ? (
                    !isPlaying ? (
                        <Button
                            onClick={() =>
                                startGame(
                                    socket,
                                    roomCode,
                                    isHost,
                                    setIsPlaying
                                )
                            }
                            style={{ ...styles.button, width: "15%" }}
                        >
                            start game
                        </Button>
                    ) : (
                        <Button
                            onClick={() => startSing(socket, roomCode, isHost)}
                            style={{ ...styles.button, width: "15%" }}
                        >
                            sing
                        </Button>
                    )
                ) : null}
            </div>
            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css?family=Teko&display=swap");
            `}</style>
        </div>
    );
}
