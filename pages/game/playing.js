import Link from 'next/link';
import { useRouter } from 'next/router';
import Headline from '../../components/headline';

const styles = {
	container: {
		textAlign: 'center'
	}
};

export default function Lobby() {
	let router = useRouter();

	return (
		<div style={styles.container}>
			<p>
				playing as{' '}
				{router.query.host && router.query.host == 'true'
					? 'host'
					: 'player'}
			</p>
			<Link
				href={{
					pathname: '/game/lobby',
					query: {
						host: router.query.host ? router.query.host : false
					}
				}}
				as='/game/lobby'
			>
				<a style={{ display: 'block' }}>Back to lobby</a>
			</Link>
		</div>
	);
}
