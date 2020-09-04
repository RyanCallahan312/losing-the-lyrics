import Link from 'next/link';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';
import Button from '../shared/button';
import TextInput from '../shared/textInput';
import * as gameActions from '../../store/game/actions';
import { createRoom } from '../../socket/emissions';
import RoomInfoPanel from './roomInfoPanel';

const styles = {
	container: {
		minWidth: '20vw',
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
	},
	subContainer: {
		height: 'auto',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
};

export default function LobbyPannel({ gameState }) {
	//--redux hooks--
	const dispatch = useDispatch();

	//--state hooks--
	const [roomCodeBuffer, setRoomCodeBuffer] = useState('');
	const [aliasBuffer, setAliasBuffer] = useState('');

	//--effect hooks--
	useEffect(() => {
		if (gameState.isHost) {
			gameActions.enterLobby(gameState.socket);
		}
	}, []);

	//--handlers--

	const onRoomCodeBufferChange = (value) => {
		if (value.trim().length <= 4) {
			setRoomCodeBuffer(value);
		}
	};

	const onAliasBufferChange = (value) => {
		if (value.trim().length <= 16) {
			setAliasBuffer(value);
		}
	};

	//--JSX--
	const roomCodeDisplay = gameState.roomCode ? (
		<p>
			the room code is <span>{gameState.roomCode}</span>
		</p>
	) : (
		<p>pretend there is a spinner here</p>
	);

	const startGameButton = (
		<Button style={{ ...styles.button, margin: 'auto' }}>Start Game</Button>
	);

	const roomJoinFields = !gameState.roomCode && (
		<div style={styles.subContainer}>
			<TextInput
				onChange={(e) => onRoomCodeBufferChange(e.target.value)}
				value={roomCodeBuffer ?? ''}
				placeholder={'Room Code'}
			/>
			<TextInput
				onChange={(e) => onAliasBufferChange(e.target.value)}
				value={aliasBuffer ?? ''}
				placeholder={'Alias'}
			/>
			<Button
				style={styles.button}
				onClick={() =>
					dispatch(
						gameActions.joinRoomAction(roomCodeBuffer, aliasBuffer),
					)
				}>
				Submit
			</Button>
		</div>
	);

	return (
		<div style={styles.container}>
			{gameState.isHost ? roomCodeDisplay : roomJoinFields}
			{gameState.roomCode && <RoomInfoPanel gameState={gameState} />}
			{gameState.isHost &&
				gameState.turnOrder.length > 1 &&
				startGameButton}
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Teko&display=swap');
				.button {
					box-shadow: 0px 0px 0px rgba(0, 113, 255, 0);
					transform: scale(1);
					transition: 150ms transform ease-out,
						150ms boxshadow ease-out;
				}

				.button:hover {
					box-shadow: 0px 0px 18px rgba(0, 113, 255, 0.5);
					transform: scale(1.02);
					transition: 150ms transform ease-out,
						150ms boxshadow ease-out;
				}
			`}</style>
		</div>
	);
}
