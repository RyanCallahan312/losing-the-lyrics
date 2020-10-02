import { useState, useEffect } from 'react';

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		flex: '0 0 100%',
		width: '100%',
		flexWrap: 'wrap',
	},
	gameState: {
		flex: '0 0 100%',
		justifyContent: 'center',
	},
	message: {
		fontSize: '20px',
		fontFamily: 'Teko',
	},
};

export default function GamePanel(props) {
	const [transcript, setTranscript] = useState('');
	const [gotInput, setGotInput] = useState(false);
	const [recognition, setRecognition] = useState(null);

	const voiceCommands = () => {
		// On start
		recognition.onstart = () => {
			console.log('Voice is actived');
		};

		// Do something when we get a result
		recognition.onresult = (e) => {
			console.log('result! ', e.results[0][0].transcript);
			setTranscript(e.results[0][0].transcript);
		};

		recognition.onspeechend = () => {
			recognition.stop();
			setGotInput(true);
			console.log('voice end');
		};
	};

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		setRecognition(new SpeechRecognition());
		if (transcript !== '' || gotInput) {
			props.handleDidSing(transcript);
			setGotInput(false);
		}
	}, [transcript, gotInput]);

	useEffect(() => {
		if (recognition) {
			voiceCommands();
		}
	}, [recognition]);

	useEffect(() => {
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
