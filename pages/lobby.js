import { useRouter } from 'next/router';
import Button from '../components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import * as gameActions from '../store/game/actions';
import * as spotifyActions from '../store/spotify/actions';
import { useEffect, useState } from 'react';
import LobbyPannel from '../components/lobby/lobbyPanel';
import io from 'socket.io-client';
import { wrapper } from '../store/store';
import * as SPOTIFY_API from '../constants/spotifyApi';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
};

const Lobby = (props) => {
	//--state hooks--
	const gameState = useSelector((state) => state.game);
	const accessToken = useSelector((state) => state.spotify.accessToken);

	const dispatch = useDispatch();

	const router = useRouter();

	const [hosting, setHosting] = useState(null);

	//--handlers--

	//--effect hooks--
	useEffect(() => {
		dispatch(gameActions.connectToServer(io));

		const queryString =
			window.location.search
				.substring(1)
				.split('&')
				.map((v) => v.split('='))
				.reduce(
					(pre, [key, value]) => ({ ...pre, [key]: value }),
					{},
				) || null;

		if (queryString && queryString.host === 'true') {
			const hash =
				window.location.hash
					.substring(1)
					.split('&')
					.map((v) => v.split('='))
					.reduce(
						(pre, [key, value]) => ({ ...pre, [key]: value }),
						{},
					) || null;
			if (!accessToken && (!hash || !hash.access_token)) {
				window.location.href = `${SPOTIFY_API.AUTH_ENDPOINT}?client_id=${SPOTIFY_API.CLIENT_ID}&redirect_uri=${SPOTIFY_API.REDIRECT_URI}&response_type=${SPOTIFY_API.RESPONSE_TYPE}&scope=${SPOTIFY_API.SCOPE}`;
			} else {
				if (hash) {
					dispatch(spotifyActions.setAccessToken(hash.access_token));
					dispatch(gameActions.enterLobby(true));
				}
			}
		}

		return () =>
			dispatch(gameActions.lobbyDisconnectFromServer(gameState.socket));
	}, []);

	useEffect(() => {
		if (gameState.isGameStarted) {
			router.push('/game');
		}
	}, [gameState.isGameStarted]);

	useEffect(() => {
		if (hosting) {
			if (!accessToken) {
				window.location.href = `${SPOTIFY_API.AUTH_ENDPOINT}?client_id=${SPOTIFY_API.CLIENT_ID}&redirect_uri=${SPOTIFY_API.REDIRECT_URI}&response_type=${SPOTIFY_API.RESPONSE_TYPE}&scope=${SPOTIFY_API.SCOPE}`;
			} else {
				dispatch(gameActions.enterLobby(true));
			}
		}
	}, [hosting]);

	//--JSX--
	const hostJoinButtons = [
		<Button
			style={styles.button}
			key='host-game'
			onClick={() => setHosting(true)}>
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
			<LobbyPannel gameState={gameState}>
				<Button
					style={{ ...styles.button, margin: '10px' }}
					onClick={() =>
						dispatch(gameActions.leaveLobby(gameState.isHost))
					}
					key='exit-lobby'>
					Exit Lobby
				</Button>
			</LobbyPannel>
		</div>
	);

	return (
		<div style={styles.container}>
			{gameState.isInLobby ? lobbyPanel : hostJoinButtons}
		</div>
	);
};

export default wrapper.withRedux(Lobby);
