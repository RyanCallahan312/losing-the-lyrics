import Link from 'next/link';
import Button from '../components/shared/button';
import { wrapper } from '../store/store';
import { useDispatch, connect, useSelector } from 'react-redux';
import * as userActions from '../store/game/actions';
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

// const getRandomHexColor = () =>
// 	'#' + (((1 << 24) * Math.random()) | 0).toString(16);

export default function Index(props) {
	const dispatch = useDispatch();
	// const handlewhackyStateBox = useCallback(() => {
	// 	dispatch(userActions.changeWhackyStateBox(getRandomHexColor));
	// }, [dispatch]);

	// const whackyStateBox = useSelector((state) => state.user.whackyStateBox);

	return (
		<div style={styles.container}>
			{/* <Button style={styles.button} onClick={handlewhackyStateBox}>
				Whacky fun time button
			</Button> */}

			<Link href='/how-to-play'>
				<Button style={styles.button}>How to play</Button>
			</Link>
			<Link href='/lobby'>
				<Button style={styles.button}>Start Game</Button>
			</Link>
		</div>
	);
}
