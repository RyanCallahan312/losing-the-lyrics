import { useState, useEffect } from 'react';

export default function HiddenVoiceRecorder({ isSinging, handleDidSing }) {
	const [transcript, setTranscript] = useState('');
	const [gotInput, setGotInput] = useState(false);
	const [recognition, setRecognition] = useState(null);
	const [lastTranscript, setLastTranscript] = useState(null);

	const voiceCommands = () => {
		// Do something when we get a result
		recognition.onresult = (e) => {
			if (gotInput) {
				handleDidSing(transcript);
				setGotInput(false);
			}
		};

		recognition.onspeechend = () => {
			recognition.stop();
			setGotInput(true);
		};
	};

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		setRecognition(new SpeechRecognition());
	}, []);

	useEffect(() => {
		if (recognition) {
			voiceCommands();
		}
	}, [recognition]);

	useEffect(() => {
		if (isSinging) {
			setTranscript('');
			recognition.start();
			setTimeout(() => {
				if (!transcript) {
					recognition.stop();
					setGotInput(true);
					console.log('voice end');
				}
			}, 10000);
		}
	}, [isSinging]);
	return null;
}
