import Link from 'next/link';
import { useRouter, Router } from 'next/router';
import PropTypes from 'prop-types';
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
			<Headline>Lose the Lyrics</Headline>
			<p>
				are you a host?{' '}
				<span>
					{router.query.host && router.query.host == 'true'
						? 'YES!'
						: 'no....'}
				</span>
			</p>
			<Link href='/index'>
				<a>Take me back!</a>
			</Link>
		</div>
	);
}
