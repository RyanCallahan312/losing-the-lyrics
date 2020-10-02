import { useEffect } from 'react';

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

export default function HiddenPlayer({
	songData,
	playPartialSong,
	playFullSong,
	stopSong,
}) {
	useEffect(() => {
		if (playPartialSong) {
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
				stopSong(true);
				window.SpotifyPlayerProvider.pause().then(() => {
					console.log('paused');
				});
			}, songData.cutOffTime - songData.startTime);
		}
	}, [playPartialSong]);
	useEffect(() => {
		if (playFullSong) {
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
				stopSong(false);
				window.SpotifyPlayerProvider.pause().then(() => {
					console.log('paused');
				});
			}, songData.endTime - songData.startTime);
		}
	}, [playFullSong]);
	return null;
}
