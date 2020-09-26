import * as ACTIONS from '../../constants/actions';

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
			let index = playlist.findIndex(currentSong);
			let nextSong;
			if (index + 1 < playlist.length) {
				nextSong = playlist[index + 1];
			} else {
				nextSong = playlist[0];
			}

			dispatch(setCurrentSong(nextSong));
		}
	};
};
