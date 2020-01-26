import Link from "next/link";
import { useRouter } from "next/router";

const styles = {
    container: {
        textAlign: "center"
    }
};

export default function Lobby() {
    let router = useRouter();

    return (
        <div style={styles.container}>
            <p>
                game over
            </p>
        </div>
    );
}
