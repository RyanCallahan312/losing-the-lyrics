import { useRouter } from 'next/router';
import Button from '../components/shared/button';
import { wrapper } from '../store/store';
import { useDispatch, connect, useSelector } from 'react-redux';
import * as userActions from '../store/game/actions';
import { useCallback, useEffect } from 'react';
import GameClientScorePanel from '../components/game/gameClientScorePanel';
import GameTurnPanel from '../components/game/gameTurnPanel';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
};

const Index = (props) => {
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
				<GameClientScorePanel gameState={gameState} />
				<h1 style={{ width: '30%', textAlign: 'center' }}>
					Game start!
				</h1>
				<GameTurnPanel gameState={gameState} />
			</div>
		);
	} else {
		return null;
	}
};

export default wrapper.withRedux(Index);
