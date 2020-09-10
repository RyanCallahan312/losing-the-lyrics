import { useRouter } from 'next/router';
import Button from '../components/shared/button';
import { useDispatch, connect, useSelector } from 'react-redux';
import * as gameActions from '../store/game/actions';
import { useCallback, useEffect } from 'react';
import LobbyPannel from '../components/lobby/lobbyPanel';
import RoomInfoPanel from '../components/lobby/roomInfoPanel';
import io from 'socket.io-client';
import { wrapper } from '../store/store';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
};

const Lobby = (props) => {
	//--state hooks--
	const gameState = useSelector((state) => state.game);

	const dispatch = useDispatch();

	const router = useRouter();

	//--handlers--

	//--effect hooks--
	useEffect(() => {
		dispatch(gameActions.connectToServer(io));
		return () => dispatch(gameActions.lobbyDisconnectFromServer());
	}, []);

	useEffect(() => {
		if (gameState.isGameStarted) {
			router.push('/game');
		}
	}, [gameState.isGameStarted]);

	//--JSX--
	const hostJoinButtons = [
		<Button
			style={styles.button}
			key='host-game'
			onClick={() => dispatch(gameActions.enterLobby(true))}>
			Host Game
		</Button>,
		<Button
			style={styles.button}
			key='join-game'
			onClick={() => dispatch(gameActions.enterLobby(false))}>
			Join Game
		</Button>,
	];

	const lobbyPanel = (
		<div>
			<LobbyPannel gameState={gameState} />
			<Button
				style={{ ...styles.button, margin: 'auto' }}
				onClick={() =>
					dispatch(gameActions.leaveLobby(gameState.isHost))
				}>
				Leave Lobby
			</Button>
		</div>
	);

	return (
		<div style={styles.container}>
			{gameState.isInLobby ? lobbyPanel : hostJoinButtons}
		</div>
	);
};

export default wrapper.withRedux(Lobby);
