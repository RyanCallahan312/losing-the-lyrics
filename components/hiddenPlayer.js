import React from 'react';
import SongData from '../constants/songData.json';

const play = (
	{
		spotify_uri,
		playerInstance: {
			_options: { getOAuthToken, id },
		},
	},
	pos
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
				spotify_uri: SongData[0].spotify_uri,
			},
			SongData[0].startTime
		);

		window.SpotifyPlayerProvider.setVolume(0.2);

		console.log(
			`playing ${SongData[0].songTitle} by ${SongData[0].artist} from uri ${SongData[0].spotifyUri} starting at ${SongData[0].startTime}`
		);

		setTimeout(() => {
			window.SpotifyPlayerProvider.pause().then(() => {
				console.log('paused');
			});
		}, SongData[0].cutOffTime - SongData[0].startTime);
	}, []);
	return null;
}
