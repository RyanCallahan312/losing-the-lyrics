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
				are you a host?
				{router.query.host && router.query.host == 'true'
					? 'YES!'
					: 'no....'}
			</p>
			<Link
				href={{
					pathname: '/game/playing',
					query: {
						host: router.query.host ? router.query.host : false
					}
				}}
				as='/game/playing'
			>
				<a style={{ display: 'block' }}>Play</a>
			</Link>

			<Link href='/index'>
				<a style={{ display: 'block' }}>Take me back!</a>
			</Link>
		</div>
	);
}
