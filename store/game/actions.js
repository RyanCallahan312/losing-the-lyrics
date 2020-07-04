import * as ACTIONS from '../../constants/actions';

// export const changeWhackyStateBox = (randomColorGen) => (dispatch) =>
// 	setInterval(
// 		() =>
// 			dispatch({
// 				type: ACTIONS.CHANGE_WHACKY_STATE_BOX,
// 				payload: randomColorGen(),
// 			}),
// 		1000,
// 	);

export const setIsHost = (isHost) => ({
	type: ACTIONS.SET_IS_HOST,
	payload: isHost,
});

export const setIsInLobby = (isInLobby) => ({
	type: ACTIONS.SET_IS_IN_LOBBY,
	payload: isInLobby,
});

export const enterLobby = (isHost) => {
	if (isHost) {
		//socket create room
	}
	return (dispatch) => {
        dispatch(setIsInLobby(true))
        dispatch(setIsHost(isHost))
    };
};
