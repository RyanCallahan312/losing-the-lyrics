const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        flex: "0 0 100%",
        width: "100%"
    }
};

export default function Game(props) {
    let gamePlay = props.isPlaying ? (
        <div>
            {props.isTurn ? (
                props.isSinging ? (
                    <div>
                        <p>sing!</p>
                        <button onClick={() => props.handleDidSing(true)}>
                            i sang!
                        </button>
                    </div>
                ) : (
                    <p>get ready to sing!</p>
                )
            ) : (
                <p>on deck</p>
            )}
        </div>
    ) : null;
    return (
        <div style={styles.container}>
            {gamePlay}
            {props.clients}
        </div>
    );
}
