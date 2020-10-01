import React from 'react';
import * as EMMISIONS from '../../client/emissions';

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

export default function HiddenPlayer({ songData, playSong, socket, isHost }) {
	React.useEffect(() => {
		if (playSong) {
			play(
				{
					playerInstance: window.SpotifyPlayerProvider,
					spotify_uri: songData.spotify_uri,
				},
				songData.startTime,
			);

			window.SpotifyPlayerProvider.setVolume(0.2);

			console.log(
				`playing ${songData.songTitle} by ${songData.artist} from uri ${songData.spotifyUri} starting at ${songData.startTime}`,
			);

			setTimeout(() => {
				EMMISIONS.stopSong(socket, isHost);
				window.SpotifyPlayerProvider.pause().then(() => {
					console.log('paused');
				});
			}, songData.cutOffTime - songData.startTime);
		}
	}, [playSong]);
	return null;
}
