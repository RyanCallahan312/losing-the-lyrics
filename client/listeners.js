import * as spotifyActions from '../store/spotify/actions';
import * as gameActions from '../store/game/actions';
import * as EMISSIONS from '../constants/emissions';

export default function bindListeners(socket, dispatch, getState) {
	console.log('bindingListeners');
	//bind listeners here
	socket.on(EMISSIONS.ROOM_INFO, (data) => {
		dispatch(gameActions.updateRoomInfo(data));
	});

	socket.on(EMISSIONS.ERROR_RESPONSE, (error) => {
		console.error(error);
	});

	socket.on(EMISSIONS.CLOSE_ROOM, () => {
		dispatch(gameActions.resetLobby());
	});

	socket.on(EMISSIONS.GAME_START, () => {
		dispatch(gameActions.setIsGameStarted(true));
	});

	socket.on(EMISSIONS.STOP_SONG, () => {
		dispatch(spotifyActions.setPlayingPartialSong(false));
	});

	socket.on(EMISSIONS.PLAY_PARTIAL_SONG, () => {
		dispatch(spotifyActions.setPlayingPartialSong(true));
	});

	socket.on(EMISSIONS.START_SING, () => {
		dispatch(gameActions.setIsSinging(true));
	});

	socket.on(EMISSIONS.END_TURN, (data) => {
		dispatch(gameActions.setTurnResults(data));
		dispatch(spotifyActions.setPlayingFullSong(true));
	});
}
