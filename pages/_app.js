import React from 'react';
import Headline from '../components/headline';

export default function _app({ Component, pageProps }) {
	return (
		<div>
			<Headline style={{textAlign: 'center'}}>LOSING THE LYRICS!</Headline>
			<Component {...pageProps} />
		</div>
	);
}
