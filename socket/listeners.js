import * as gameActions from '../store/game/actions';
import * as EMISSIONS from '../constants/emissions';

export default function bindListeners(socket, dispatch, getState) {
	console.log('bindingListeners')
	//bind listeners here
	socket.on(EMISSIONS.ROOM_INFO, (data) => {
		dispatch(gameActions.updateRoomInfo(data))
	});

	socket.on(EMISSIONS.ERROR_RESPONSE, (error) => {
		console.error(error);
	});
}
