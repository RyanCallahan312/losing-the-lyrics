import Link from "next/link";
import Button from "../components/button";

const styles = {
    container: {
        height: "50vh",
        flex: "0 1 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    button: {
        width: "100%",
        minWidth: "200px"
    }
};

export default function Index() {
    return (
        <div style={styles.container}>
            <Link href="/how-to-play">
                <Button style={styles.button}>How to play</Button>
            </Link>
            <Link
                href={{
                    pathname: "/game/lobby",
                    query: { host: true }
                }}
                as="/game/lobby"
            >
                <Button style={styles.button}>Host a game</Button>
            </Link>
            <Link
                href={{
                    pathname: "/game/lobby",
                    query: { host: false }
                }}
                as="/game/lobby"
            >
                <Button style={styles.button}>join a game</Button>
            </Link>
        </div>
    );
}
