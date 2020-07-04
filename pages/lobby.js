import Link from 'next/link';
import Button from '../components/shared/button';
import { useDispatch, connect, useSelector } from 'react-redux';
import * as gameActions from '../store/game/actions';
import { useCallback, useEffect } from 'react';
import LobbyPannel from '../components/lobby/lobbyPanel';
import initialGameState from '../store/game/initialState'

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

export default function Lobby(props) {
	const gameState = useSelector((state) => state.game);

	const dispatch = useDispatch();

	const handleEnterLobby = (isHost) =>
		dispatch(gameActions.enterLobby(isHost));

	useEffect(() => {

	})

	const hostJoinButtons = [
		<Button key='host-game' onClick={() => handleEnterLobby(true)}>
			Host Game
		</Button>,
		<Button key='join-game' onClick={() => handleEnterLobby(false)}>
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
}
