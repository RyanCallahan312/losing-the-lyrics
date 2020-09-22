import gameState from './game/initialState';
import spotifyState from './spotify/initialState';
import stateKeys from '../constants/stateKeys';

export default {
	[stateKeys.game]: gameState,
	[stateKeys.spotify]: spotifyState,
};
