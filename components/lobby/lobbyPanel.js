import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Button from '../shared/button';
import TextInput from '../shared/textInput';
import * as gameActions from '../../store/game/actions';
import RoomInfoPanel from './roomInfoPanel';
import { useSpring, animated } from 'react-spring';

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
		display: 'inline',
	},
	roomCode: {
		fontFamily: 'Teko',
		fontSize: 'calc(2vw + 30px)',
		color: 'rgba(50,138,250, 1)',
		textShadow:
			'2px 2px rgba(255, 0, 0, 1), 0 0 6px rgba(0, 113, 255, 0.85)',
		cursor: 'pointer',
	},
};

export default function LobbyPannel({ gameState, children }) {
	//--redux hooks--
	const dispatch = useDispatch();

	//--state hooks--
	const [roomCodeBuffer, setRoomCodeBuffer] = useState('');
	const [aliasBuffer, setAliasBuffer] = useState('');
	const [copied, setCopied] = useState(false);

	//--effect hooks--
	useEffect(() => {
		if (gameState.isHost) {
			gameActions.enterLobby(gameState.socket);
		}
	}, []);

	//spring hooks
	const springAnimation = useSpring({
		opacity: copied ? 1 : 0,
		transform: copied
			? 'scale(1,1) translate(0px,0px)'
			: 'scale(0,0) translate(-100%,100%)',
		from: { opacity: 0, transform: 'scale(0,0) translate(-100%,100%)' },
		config: { duration: 150 },
	});

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

	const onRoomCodeClick = async () => {
		await window.navigator.clipboard.writeText(gameState.roomCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	};

	//--JSX--
	const roomCodeDisplay = (
		<div style={{ position: 'relative' }}>
			<p style={styles.roomCodeText}>
				Room Code:{' '}
				<span
					id='room-code'
					style={styles.roomCode}
					onClick={onRoomCodeClick}>
					{gameState.roomCode}
				</span>
			</p>
			<animated.div id='speech-bubble' style={springAnimation}>
				Copied!
			</animated.div>
		</div>
	);

	const startGameButton = (
		<Button
			style={{ ...styles.button, margin: '10px' }}
			onClick={onGameStart}
			key='start-game'>
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
			}
			key='join-room'>
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
				#speech-bubble {
					display: inline;
					position: absolute;
					font-family: Roboto;
					color: white;
					font-size: calc(13px + 0.5vw);
					text-align: center;
					width: fit-content;
					height: fit-content;
					border: 5px solid rgba(50, 138, 250, 1);
					border-radius: 13px;
					background-color: rgba(50, 138, 250, 1);
				}
				#speech-bubble:after {
					content: '';
					position: absolute;
					bottom: -15px;
					left: 0;
					border-right: 25px solid transparent;
					border-top: 15px solid rgba(50, 138, 250, 1);
					display: block;
					margin-top: 2px;
				}
			`}</style>
		</div>
	);
}
