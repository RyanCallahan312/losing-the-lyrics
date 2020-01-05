import Link from 'next/link';
import Headline from '../components/headline';

const styles = {
	container: {
		textAlign: 'center'
	}
};

export default function HowToPlay() {
	return (
		<div style={styles.container}>
			<Headline>Lose the Lyrics</Headline>
			<p>just play it 4heads</p>
			<Link href='/index'>
				<a>Take me back!</a>
			</Link>
		</div>
	);
}
