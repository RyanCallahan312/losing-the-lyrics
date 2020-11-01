import { useEffect } from 'react';

const play = async (
	{
		playerInstance: {
			_options: { getOAuthToken, id },
		},
		spotify_uri,
	},
	pos,
) => {
	await getOAuthToken((access_token) => {
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
			setTimeout(() => {
				var checkStopPlayback = setInterval(async () => {
					let state = await window.SpotifyPlayerProvider.getCurrentState();
					if (state && state.position >= songData.cutOffTime) {
						stopSong(true);
						window.SpotifyPlayerProvider.pause();
						clearInterval(checkStopPlayback);
					}
				}, 100);
			}, (songData.cutOffTime - songData.startTime) * 0.75);

			window.SpotifyPlayerProvider.setVolume(0.1);
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

			setTimeout(() => {
				var checkStopPlayback = setInterval(async () => {
					let state = await window.SpotifyPlayerProvider.getCurrentState();
					if (state && state.position >= songData.endTime) {
						stopSong(false);
						window.SpotifyPlayerProvider.pause();
						clearInterval(checkStopPlayback);
					}
				}, 100);
			}, (songData.endTime - songData.startTime) * 0.75);

			window.SpotifyPlayerProvider.setVolume(0.1);
		}
	}, [playFullSong]);
	return null;
}
