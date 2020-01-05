import React from 'react';
import Headline from '../components/headline';

export default function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Headline style={{textAlign: 'center'}}>Losing the Lyrics!</Headline>
			<Component {...pageProps} />
		</div>
	);
}
