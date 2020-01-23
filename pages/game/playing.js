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
                playing as{" "}
                {router.query.host && router.query.host == "true"
                    ? "host"
                    : "player"}
            </p>
        </div>
    );
}
