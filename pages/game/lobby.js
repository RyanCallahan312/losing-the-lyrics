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

const hostCode = Math.random()
    .toString(36)
    .substr(2, 4);

let socket = null;

const endpoint = "http://localhost";

const connectToRoom = () => {
    socket.emit("button press", {
        message: "a player has pressed the button"
    });
};

const connectToServer = (endpoint, isHost) => {
    socket = io.connect(endpoint);
    socket.emit("join room", {
        host: isHost
    });
};

export default function Lobby() {
    let router = useRouter();
    let isHost = router.query.host && router.query.host ==="true";

    React.useEffect(() => connectToServer(endpoint), []);

    return (
        <div style={styles.container}>
            <h1 style={styles.text}>
                {isHost ? "You are a host!" : "You are a player!"}
            </h1>
            <h2 style={styles.text}>
                {isHost ? `your host code is ${hostCode}` : null}
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
                <Button style={styles.button} onClick={() => connectToRoom()}>
                    connect to room
                </Button>
            )}
        </div>
    );
}
