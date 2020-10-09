import { useRouter } from 'next/router';
import { wrapper } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../store/game/actions';
import { useEffect } from 'react';
import GameClientScorePanel from '../components/game/gameClientScorePanel';
import GameTurnPanel from '../components/game/gameTurnPanel';
import GameHostPanel from '../components/game/gameHostPanel';
import GamePlayerPanel from '../components/game/gamePlayerPanel';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
};

const Game = (props) => {
	const gameState = useSelector((state) => state.game);

	const dispatch = useDispatch();

	const router = useRouter();

	useEffect(() => {
		if (gameState.isInLobby) {
			return handleCloseGame;
		}
	}, []);

	useEffect(() => {
		if (!gameState.isInLobby) {
			router.push('/lobby');
		}
	}, [gameState.isInLobby]);

	const handleCloseGame = () => {
		dispatch(userActions.closeGame());
	};

	if (gameState.isInLobby) {
		return (
			<div style={styles.container}>
				{gameState.isHost ? (
					<>
						<GameClientScorePanel gameState={gameState} />
						<GameHostPanel gameState={gameState} />
						<GameTurnPanel gameState={gameState} />
					</>
				) : (
					<GamePlayerPanel isSinging={gameState.isSinging} />
				)}
			</div>
		);
	} else {
		return null;
	}
};

export default wrapper.withRedux(Game);
