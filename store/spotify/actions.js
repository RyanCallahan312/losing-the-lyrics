import * as ACTIONS from '../../constants/actions';
import { selectSong } from '../../client/emissions';
import _ from 'lodash';

export const setPlayingPartialSong = (playingPartialSong) => ({
	type: ACTIONS.SET_PLAYING_PARTIAL_SONG,
	payload: playingPartialSong,
});

export const setPlayingFullSong = (playingFullSong) => ({
	type: ACTIONS.SET_PLAYING_FULL_SONG,
	payload: playingFullSong,
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
			let index = playlist.SONGS.findIndex((song) =>
				_.isEqual(song, currentSong),
			);
			if (index !== playlist.length - 1) {
				dispatch(setCurrentSong(playlist.SONGS[index + 1]));
			} else {
				dispatch(setCurrentSong(playlist.SONGS[0]));
			}
		}
	};
};

export const setCurrentSong = (song) => {
	return (dispatch, getState) => {
		let { isHost, socket, roomCode } = getState().game;
		selectSong(socket, { isHost, roomCode, songData: song });
		dispatch({
			type: ACTIONS.SET_CURRENT_SONG,
			payload: song,
		});
	};
};
