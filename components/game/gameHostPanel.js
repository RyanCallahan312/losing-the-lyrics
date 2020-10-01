import PlaylistSelector from '../spotify/playlistSelector';
import * as spotifyActions from '../../store/spotify/actions';
import { useDispatch, useSelector } from 'react-redux';
import HiddenPlayer from '../spotify/hiddenPlayer';
import * as EMMISIONS from '../../client/emissions';
import LyricsDisplay from '../spotify/lyrcisDisplay';

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
		height: 'auto',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'row',
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

export default function GameHostPanel({ gameState }) {
	//--redux hooks--
	const spotifyState = useSelector((state) => state.spotify);

	const dispatch = useDispatch();

	//--state hooks--

	//--effect hooks--

	//--handlers--

	const handleSelectPlaylist = (playlist) => {
		//TODO: trim playlist to make it an even number for the amount of clients and randomize the order
		dispatch(spotifyActions.setPlaylist(playlist));
		dispatch(spotifyActions.setCurrentSong(playlist.SONGS[0]));
		EMMISIONS.startRound(gameState.socket, {
			roomCode: gameState.roomCode,
			isHost: gameState.isHost,
		});
	};

	//--JSX--

	return (
		<div style={{ ...styles.subContainer, width: '30%' }}>
			{spotifyState.playlist ? (
				<>
					<LyricsDisplay lyrics={spotifyState.currentSong.lyrics} />
				</>
			) : (
				<PlaylistSelector handleSelectPlaylist={handleSelectPlaylist} />
			)}
			{spotifyState.currentSong && (
				<HiddenPlayer
					songData={spotifyState.currentSong}
					playSong={spotifyState.playingSong}
					socket={gameState.socket}
					isHost={gameState.isHost}
				/>
			)}
		</div>
	);
}
