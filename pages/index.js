import Link from 'next/link';
import Button from '../components/shared/button';
import { wrapper } from '../store/store';

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

const Index = (props) => {
	return (
		<div style={styles.container}>
			<Link href='/how-to-play'>
				<Button style={styles.button}>How to play</Button>
			</Link>
			<Link href='/lobby'>
				<Button style={styles.button}>Start Game</Button>
			</Link>
		</div>
	);
};

export default wrapper.withRedux(Index);
