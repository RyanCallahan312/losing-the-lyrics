import React from "react";

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        flex: "0 0 100%",
        width: "100%",
        flexWrap: "wrap"
    },
    gameState: {
        flex: "0 0 100%",
        justifyContent: "center"
    },
    message: {
        fontSize: "20px",
        fontFamily: "Teko"
    }
};

export default function GamePanel(props) {
    const [transcript, setTranscript] = React.useState("");
    const [recognition, setRecognition] = React.useState(
        (transcript, setTranscript) => {
            var SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            var recognition = new SpeechRecognition();

            recognition.maxAlternatives = 10;
            recognition.continuous = false;

            recognition.onresult = event => {
                console.log("result", e);
                let interimTranscript = "";
                for (
                    let i = event.resultIndex, len = event.results.length;
                    i < len;
                    i++
                ) {
                    let current_transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        setTranscript(transcript + current_transcript);
                    } else {
                        setTranscript(transcript + current_transcript);
                    }
                }
            };

            recognition.onspeechend = () => {
                props.handleDidSing(transcript);
            };

            return recognition;
        }
    );

    React.useEffect(() => {
        if (props.isSinging) {
            recognition.start();
        }
    }, [props.isSinging]);

    let gamePlay = props.isPlaying ? (
        <div style={styles.gameState}>
            {props.isTurn ? (
                props.isSinging ? (
                    <div>
                        <p style={styles.message}>sing!</p>
                    </div>
                ) : (
                    <p style={styles.message}>get ready to sing!</p>
                )
            ) : (
                <p style={styles.message}>on deck</p>
            )}
        </div>
    ) : null;
    return (
        <div style={styles.container}>
            {!props.isHost ? gamePlay : null}
            {props.clients}
        </div>
    );
}
