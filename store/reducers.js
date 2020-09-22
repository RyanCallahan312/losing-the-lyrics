import gameReducer from './game/reducer';
import spotifyReducer from './spotify/reducer';

import stateKeys from '../constants/stateKeys';
import { combineReducers } from 'redux';

export default combineReducers({
	[stateKeys.game]: gameReducer,
	[stateKeys.spotify]: spotifyReducer,
});
