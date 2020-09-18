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
		flexDirection: 'column',
	},
	subContainer: {
		height: 'auto',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
	roomCodeText: {
		fontFamily: 'Teko',
		fontSize: 'calc(.8vw + 16px)',
	},
	roomCode: {
		fontFamily: 'Teko',
		fontSize: 'calc(2vw + 30px)',
		color: 'rgba(50,138,250, 1)',
		textShadow:
			'2px 2px rgba(255, 0, 0, 1), 0 0 6px rgba(0, 113, 255, 0.85)',
	},
};

export default function LobbyPannel({ gameState, children }) {
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

	const onGameStart = () => {
		gameActions.hostStartGame(
			gameState.socket,
			gameState.isHost,
			gameState.roomCode,
		);
	};

	//--JSX--
	const roomCodeDisplay = (
		<p style={styles.roomCodeText}>
			Room Code: <span style={styles.roomCode}>{gameState.roomCode}</span>
		</p>
	);

	const startGameButton = (
		<Button
			style={{ ...styles.button, margin: '10px' }}
			onClick={onGameStart}>
			Start Game
		</Button>
	);

	const roomJoinFields = !gameState.roomCode && (
		<div
			style={{
				...styles.subContainer,
				flexWrap: 'wrap',
				flexFlow: 'column',
			}}>
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
		</div>
	);

	const joinRoomButton = (
		<Button
			style={styles.button}
			onClick={() =>
				dispatch(
					gameActions.joinRoomAction(roomCodeBuffer, aliasBuffer),
				)
			}>
			Submit
		</Button>
	);

	const navButtons = () => {
		let buttons = [];
		buttons.push(children);
		if (gameState.isHost && gameState.turnOrder.length > 1)
			buttons.push(startGameButton);

		if (!gameState.roomCode && !gameState.isHost) {
			buttons.push(joinRoomButton);
		}

		return buttons;
	};

	return (
		<div style={styles.container}>
			{gameState.roomCode && roomCodeDisplay}
			{!gameState.isHost && roomJoinFields}
			{gameState.roomCode && <RoomInfoPanel gameState={gameState} />}
			<div
				style={{
					...styles.subContainer,
					width: '-webkit-fill-available',
				}}>
				{navButtons()}
			</div>
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
