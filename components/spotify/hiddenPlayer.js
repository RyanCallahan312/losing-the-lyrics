import React from 'react';

const play = (
	{
		playerInstance: {
			_options: { getOAuthToken, id },
		},
		spotify_uri,
	},
	pos,
) => {
	getOAuthToken((access_token) => {
		fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
			method: 'PUT',
			body: JSON.stringify({ uris: [spotify_uri], position_ms: pos }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		});
	});
};

export default function HiddenPlayer(props) {
	console.log(props);
	React.useEffect(() => {
		console.log(window.SpotifyPlayerProvider);

		play(
			{
				playerInstance: window.SpotifyPlayerProvider,
				spotify_uri: props.songData.spotify_uri,
			},
			props.songData.startTime,
		);

		window.SpotifyPlayerProvider.setVolume(0.2);

		console.log(
			`playing ${props.songData.songTitle} by ${props.songData.artist} from uri ${props.songData.spotifyUri} starting at ${props.songData.startTime}`,
		);

		setTimeout(() => {
			window.SpotifyPlayerProvider.pause().then(() => {
				console.log('paused');
			});
		}, props.songData.cutOffTime - props.songData.startTime);
	}, []);
	return null;
}
