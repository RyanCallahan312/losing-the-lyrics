import Link from 'next/link';
import Button from '../components/shared/button';
import { useDispatch, connect, useSelector } from 'react-redux';
import * as gameActions from '../store/game/actions';
import { useCallback, useEffect } from 'react';
import LobbyPannel from '../components/lobby/lobbyPanel';
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

	//--handlers--

	//--effect hooks--
	useEffect(() => {
		dispatch(gameActions.connectToServer(io));
		return () => dispatch(gameActions.disconnectFromServer());
	}, []);

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

	return (
		<div style={styles.container}>
			{gameState.isInLobby ? (
				<LobbyPannel gameState={gameState} />
			) : (
				hostJoinButtons
			)}
		</div>
	);
};

export default wrapper.withRedux(Lobby);
