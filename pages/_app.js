import React from 'react';
import Link from 'next/link';
import Headline from '../components/shared/headline';
import { wrapper } from '../store/store';

const styles = {
	flexContainer: {
		display: 'flex',
		flexFlow: 'column',
		height: '100%',
	},
	header: {
		flex: '0 1 auto',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
};

const _app = ({ Component, pageProps }) => {
	const header = (
		<Link href='/index'>
			<Headline style={styles.header}>LOSING THE LYRICS!</Headline>
		</Link>
	);

	return (
		<div style={styles.flexContainer}>
			{header}
			<Component {...pageProps} />
		</div>
	);
};

export default wrapper.withRedux(_app);
