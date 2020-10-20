import React from 'react';
import Link from 'next/link';
import Headline from '../components/shared/headline';
import { wrapper } from '../store/store';
import { useSelector } from 'react-redux';
import Head from 'next/head';

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
	const accessToken = useSelector((state) => state.spotify.accessToken);

	const header = (
		<Link href='/'>
			<Headline style={styles.header}>LOSING THE LYRICS!</Headline>
		</Link>
	);

	const headInjection = accessToken && (
		<Head>
			<script src='https://sdk.scdn.co/spotify-player.js'></script>
			<script>
				{`window.onSpotifyWebPlaybackSDKReady = () => {
                    const token = '${accessToken}';
                    const player = new Spotify.Player({
                      name: 'Web Playback SDK Quick Start Player',
                      getOAuthToken: cb => { cb(token); }
                    });
                  
                    // Error handling
                    player.addListener('initialization_error', ({ message }) => { console.error(message); });
                    player.addListener('authentication_error', ({ message }) => { console.error(message); });
                    player.addListener('account_error', ({ message }) => { console.error(message); });
                    player.addListener('playback_error', ({ message }) => { console.error(message); });
                  
                    // Connect to the player!
                    player.connect();
                    window.SpotifyPlayerProvider = player;
                  };
    `}
			</script>
		</Head>
	);

	return (
		<div style={styles.flexContainer}>
			{headInjection}
			{header}
			<Component {...pageProps} />
		</div>
	);
};

export default wrapper.withRedux(_app);
