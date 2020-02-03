import React from "react";
import Link from "next/link";
import Headline from "../components/headline";
import io from "socket.io-client";

const styles = {
    flexContainer: {
        display: "flex",
        flexFlow: "column",
        height: "100%"
    },
    header: {
        flex: "0 1 auto",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    }
};

// function disconnectSocket(isHost, socket, roomCode) {
//     console.log({ roomCode, socket, isHost });
//     if (roomCode) {
//         if (isHost) {
//             socket.emit("close room", { isHost, roomCode });
//         } else {
//             socket.emit("leave room", { isHost, roomCode });
//         }
//     }
// }

// function connectSocket(setSocket) {
//     const endpoint = "http://localhost:43020";
//     setSocket(io.connect(endpoint));
// }

export default function _app({ Component, pageProps }) {
//     const [socket, setSocket] = React.useState(null);
//     const [room, setRoom] = React.useState(null);

    return (
        <div style={styles.flexContainer}>
            <Link href="/index">
                <Headline style={styles.header}>LOSING THE LYRICS!</Headline>
            </Link>
            <Component
                {...pageProps}
            />
        </div>
    );
}
