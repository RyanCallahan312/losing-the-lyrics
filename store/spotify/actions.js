import * as ACTIONS from '../../constants/actions';

export const setPlaylist = (playlist) => ({
	type: ACTIONS.SET_PLAYLIST,
	payload: playlist,
});

export const setAccessToken = (accessToken) => ({
	type: ACTIONS.SET_ACCESS_TOKEN,
	payload: accessToken
})

