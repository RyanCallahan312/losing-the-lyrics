import Link from 'next/link';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useCallback } from 'react';

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

export default function LobbyPannel(props) {
	return (
		<div style={styles.container}>
			<p>
				hello you are a lobby persons and a{' '}
				{props.gameState.isHost ? 'host' : 'player'}
			</p>
		</div>
	);
}
