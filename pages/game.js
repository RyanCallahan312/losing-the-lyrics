import { useRouter } from 'next/router';
import Button from '../components/shared/button';
import { wrapper } from '../store/store';
import { useDispatch, connect, useSelector } from 'react-redux';
import * as userActions from '../store/game/actions';
import { useCallback, useEffect } from 'react';
import RoomInfoPanel from '../components/game/roomInfoPanel';

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

	const router = useRouter();

	useEffect(() => {
		if (!gameState.isInLobby) {
			router.push('/lobby');
		}
	}, []);

	if (gameState.isInLobby) {
		return (
			<div style={styles.container}>
				<RoomInfoPanel gameState={gameState} />
				<h1>Game start!</h1>
				<RoomInfoPanel gameState={gameState} />
			</div>
		);
	} else {
		return null;
	}
};

export default wrapper.withRedux(Index);
