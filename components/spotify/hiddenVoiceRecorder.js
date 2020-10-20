import { useState, useEffect } from 'react';

export default function HiddenVoiceRecorder({ isSinging, handleDidSing }) {
	const [transcript, setTranscript] = useState(null);
	const [gotInput, setGotInput] = useState(false);
	const [recognition, setRecognition] = useState(null);
	const [noInputTimeout, setNoInputTimeout] = useState(null);

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
		if (transcript !== null && gotInput) {
			handleDidSing(transcript);
			clearTimeout(noInputTimeout);
			setNoInputTimeout(null);
		}
	}, [transcript, gotInput]);

	useEffect(() => {
		if (isSinging) {
			setTranscript(null);
			setGotInput(false);
			recognition.start();
			setNoInputTimeout(
				setTimeout(() => {
					if (!gotInput && transcript === null) {
						console.log(gotInput, transcript);
						recognition.stop();
						setTranscript('');
						setGotInput(true);
					}
				}, 10000),
			);
		}
	}, [isSinging]);
	return null;
}
