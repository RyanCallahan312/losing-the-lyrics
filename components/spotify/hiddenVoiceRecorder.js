import { useState, useEffect } from 'react';

export default function HiddenVoiceRecorder({ isSinging, handleDidSing }) {
	const [transcript, setTranscript] = useState('');
	const [gotInput, setGotInput] = useState(false);
	const [recognition, setRecognition] = useState(null);

	const voiceCommands = () => {
		// Do something when we get a result
		recognition.onresult = (e) => {
			setTranscript(e.results[0][0].transcript);
		};

		recognition.onspeechend = () => {
			recognition.stop();
			setGotInput(true);
		};
	};

	useEffect(() => {
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		SpeechRecognition.maxAlternatives = 10;
		setRecognition(new SpeechRecognition());
		if (transcript !== '' || gotInput) {
			console.log(transcript);
			handleDidSing(transcript);
			setGotInput(false);
		}
	}, [transcript, gotInput]);

	useEffect(() => {
		if (recognition) {
			voiceCommands();
		}
	}, [recognition]);

	useEffect(() => {
		if (isSinging) {
			recognition.start();
		}
	}, [isSinging]);
	return null;
}
