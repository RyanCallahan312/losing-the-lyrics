import PlaylistSelector from '../spotify/playlistSelector';
import * as spotifyActions from '../../store/spotify/actions';
import { useDispatch, useSelector } from 'react-redux';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
	},
	subContainer: {
		height: 'auto',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'row',
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

export default function GameHostPanel() {
	//--redux hooks--
	const spotifyState = useSelector((state) => state.spotify);

	const dispatch = useDispatch();

	//--state hooks--

	//--effect hooks--

	//--handlers--

	const handleSelectPlaylist = (playlist) => {
		dispatch(spotifyActions.setPlaylist(playlist));
	};

	//--JSX--

	return (
		<div style={styles.subContainer}>
			{spotifyState.playlist ? (
				<pre>{JSON.stringify(spotifyState.playlist, null, 4)}</pre>
			) : (
				<PlaylistSelector handleSelectPlaylist={handleSelectPlaylist} />
			)}
		</div>
	);
}
