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
		setRecognition(new SpeechRecognition());
	}, []);

	useEffect(() => {
		if (recognition) {
			voiceCommands();
		}
	}, [recognition]);

	useEffect(() => {
		if (transcript !== '' || gotInput) {
			handleDidSing(transcript);
			setTranscript('');
			setGotInput(false);
		}
	}, [transcript, gotInput]);

	useEffect(() => {
		if (isSinging) {
			setTranscript('');
			setGotInput(false);
			recognition.start();
			setTimeout(() => {
				if (!gotInput && transcript === '') {
					recognition.stop();
					setGotInput(true);
				}
			}, 10000);
		}
	}, [isSinging]);
	return null;
}
