import gameReducer from './game/reducer';
import stateKeys from '../constants/stateKeys';
import { combineReducers } from 'redux'

export default combineReducers({
    [stateKeys.game]: gameReducer
});
