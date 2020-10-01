import { useState, useEffect } from 'react';

export default function HiddenVoiceRecorder({ isSinging, handleDidSing }) {
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