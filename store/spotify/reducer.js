import initialState from './initialState';
import * as ACTIONS from '../../constants/actions';

export default function spotifyReducer(
	state = initialState,
	{ type, payload },
) {
	switch (type) {
		case ACTIONS.SET_PLAYLIST:
			return {
				...state,
				playlist: payload,
			};

		case ACTIONS.SET_ACCESS_TOKEN:
			return {
				...state,
				accessToken: payload,
			};

		case ACTIONS.SET_CURRENT_SONG:
			return {
				...state,
				currentSong: payload,
			};

		case ACTIONS.SET_PLAYING_PARTIAL_SONG:
			return {
				...state,
				playingPartialSong: payload,
			};

		case ACTIONS.SET_PLAYING_FULL_SONG:
			return {
				...state,
				playingFullSong: payload,
			};

		case ACTIONS.LEAVE_lOBBY:
			return {
				...state,
				playlist: null,
				currentSong: null,
				playingPartialSong: false,
				playingFullSong: false,
			};

		default:
			return state;
	}
}
