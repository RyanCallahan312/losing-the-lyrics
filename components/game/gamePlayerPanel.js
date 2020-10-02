import Microphone from '../icons/microphone';
import HiddenVoiceRecorder from '../spotify/hiddenVoiceRecorder';
import * as gameActions from '../../store/game/actions';
import { useDispatch } from 'react-redux';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
		minWidth: '300px',
	},
	subContainer: {
		height: '100%',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'row',
		padding: 20,
		minWidth: '300px',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
	listItem: {
		listStyleType: 'none',
		fontFamily: 'Teko',
		fontSize: 'calc(20px + 1.4vh)',
	},
	list: { margin: 0, padding: 0 },
};

export default function GamePlayerPanel({ isSinging }) {
	//--redux hooks--

	const dispatch = useDispatch();

	//--state hooks--

	//--effect hooks--

	//--handlers--

	const handleDidSing = (transcript) => {
		console.log(transcript);
		dispatch(gameActions.gotTranscript(transcript));
	};

	//--JSX--

	return (
		<div style={{ ...styles.subContainer, width: '30%', padding: 0 }}>
			<Microphone disabled={!isSinging} width='100%' />
			<HiddenVoiceRecorder
				handleDidSing={handleDidSing}
				isSinging={isSinging}
			/>
		</div>
	);
}
