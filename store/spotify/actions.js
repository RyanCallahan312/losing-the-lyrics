import * as ACTIONS from '../../constants/actions';

export const setPlaylist = (playlist) => ({
	type: ACTIONS.SET_PLAYLIST,
	payload: playlist,
});
