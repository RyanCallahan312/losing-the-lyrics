import React from 'react';
import Link from 'next/link';
import Headline from '../components/headline';
import io from 'socket.io-client';

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

export default function _app({ Component, pageProps }) {
	return (
		<div style={styles.flexContainer}>
			<Link href='/index'>
				<Headline style={styles.header}>LOSING THE LYRICS!</Headline>
			</Link>
			<Component {...pageProps} />
		</div>
	);
}
