import Link from 'next/link';
import Headline from '../components/headline';

const styles = {
	container: {
		textAlign: 'center'
	}
};

export default function Index() {
	return (
		<div style={styles.container}>
			<Link href='/how-to-play'>
				<a style={{ display: 'block' }}>How to play</a>
			</Link>
			<Link
				href={{
					pathname: '/game/lobby',
					query: { host: true }
				}}
				as='/game/lobby'
			>
				<a style={{ display: 'block' }}>Host a game</a>
			</Link>
			<Link
				href={{
					pathname: '/game/lobby',
					query: { host: false }
				}}
				as='/game/lobby'
			>
				<a style={{ display: 'block' }}>join a game</a>
			</Link>
		</div>
	);
}
