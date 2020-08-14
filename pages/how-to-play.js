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
};

const HowToPlay = () => {
	return (
		<div style={styles.container}>
			<p>something something how to play goes here</p>
		</div>
	);
};

export default wrapper.withRedux(HowToPlay);
