import PlaylistSelector from '../spotify/playlistSelector';
import * as gameActions from '../../store/game/actions';
import * as spotifyActions from '../../store/spotify/actions';
import { useDispatch, useSelector } from 'react-redux';
import HiddenPlayer from '../spotify/hiddenPlayer';
import * as EMMISIONS from '../../client/emissions';
import LyricsDisplay from '../spotify/lyrcisDisplay';
import TurnResultsDisplay from './turnResultsDisplay';
import { FisherYatesShuffle as arrayShuffle } from '../utils/arrayUtils';

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
		//TODO: trim playlist to make it an even number for the amount of clients
		playlist = arrayShuffle(playlist);
		dispatch(spotifyActions.setPlaylist(playlist));
		dispatch(spotifyActions.setCurrentSong(playlist.SONGS[0]));
		EMMISIONS.startRound(gameState.socket, {
			roomCode: gameState.roomCode,
			isHost: gameState.isHost,
		});
	};

	const stopSong = (shouldEmitStopSong) => {
		if (shouldEmitStopSong) {
			dispatch(spotifyActions.setPlayingPartialSong(false));
			EMMISIONS.stopSong(gameState.socket, {
				isHost: gameState.isHost,
				roomCode: gameState.roomCode,
			});
			//TODO: do something for time out
		} else {
			dispatch(spotifyActions.setPlayingFullSong(false));
			if (
				gameState.turnOrder[gameState.turnOrder.length - 1] ===
				gameState.currentTurn
			) {
				//TODO: goto next round
				console.log('round Complete');
			} else {
				dispatch(gameActions.nextTurn());
				dispatch(spotifyActions.nextSong());
			}
		}
	};

	//--JSX--

	return (
		<div style={{ ...styles.subContainer, width: '30%' }}>
			{spotifyState.playlist ? (
				<div>
					<LyricsDisplay
						partialLyrics={spotifyState.currentSong.partialLyrics}
						fullLyrics={spotifyState.currentSong.fullLyrics}
						turnResults={gameState.turnResults}
					/>
					{gameState.turnResults && (
						<TurnResultsDisplay
							turnResults={gameState.turnResults}
							currentTurnClient={gameState.clients.find(
								(client) =>
									client.socketId === gameState.currentTurn,
							)}
						/>
					)}
				</div>
			) : (
				<PlaylistSelector handleSelectPlaylist={handleSelectPlaylist} />
			)}
			{spotifyState.currentSong && (
				<HiddenPlayer
					songData={spotifyState.currentSong}
					playPartialSong={spotifyState.playingPartialSong}
					playFullSong={spotifyState.playingFullSong}
					stopSong={stopSong}
				/>
			)}
		</div>
	);
}
