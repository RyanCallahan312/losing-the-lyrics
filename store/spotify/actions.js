import * as ACTIONS from '../../constants/actions';

export const setPlayingSong = (playingSong) => ({
	type: ACTIONS.SET_PLAYING_SONG,
	payload: playingSong,
});

export const setCurrentSong = (song) => ({
	type: ACTIONS.SET_CURRENT_SONG,
	payload: song,
});

export const setPlaylist = (playlist) => ({
	type: ACTIONS.SET_PLAYLIST,
	payload: playlist,
});

export const setAccessToken = (accessToken) => ({
	type: ACTIONS.SET_ACCESS_TOKEN,
	payload: accessToken,
});

export const nextSong = () => {
	return (dispatch, getState) => {
		let { playlist, currentSong } = getState().spotify;

		if (currentSong && playlist) {
			let index = playlist.SONGS.findIndex(currentSong);
			let nextSong;
			if (index + 1 < playlist.length) {
				nextSong = playlist.SONGS[index + 1];
			} else {
				nextSong = playlist.SONGS[0];
			}

			dispatch(setCurrentSong(nextSong));
		}
	};
};
