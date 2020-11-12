import HiddenPlayer from '../components/spotify/hiddenPlayer';
import SONG_DATA from '../constants/songData';
import * as SONGS from '../constants/songs';
import * as SPOTIFY_API from '../constants/spotifyApi';
import * as spotifyActions from '../store/spotify/actions';
import Playlists from '../constants/playlists';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
		minWidth: '300px',
		width: '33%',
	},
	input: {
		width: '30%',
	},
};

export default function Sandbox() {
	const spotifyState = useSelector((state) => state.spotify);

	const dispatch = useDispatch();

	const [playPartialSong, setPlayPartialSong] = useState(false);
	const [playFullSong, setPlayFullSong] = useState(false);
	const [songData, setSongData] = useState(null);

	const [spotifyURI, setSpotifyURI] = useState('');
	const [startTime, setStartTime] = useState(0);
	const [cutOffTime, setCutOffTime] = useState(0);
	const [endTime, setEndTime] = useState(0);

	const stopSong = (isPartialSong) => {
		isPartialSong ? setPlayPartialSong(false) : setPlayFullSong(false);
	};

	const replaceSongData = () => {
		setSongData({
			startTime,
			cutOffTime,
			endTime,
			spotify_uri: spotifyURI,
		});
	};

	const selectSong = (song) => {
		setSongData(song);
		setSpotifyURI(song.spotify_uri);
		setStartTime(song.startTime);
		setCutOffTime(song.cutOffTime);
		setEndTime(song.endTime);
	};

	const selector = (song) => {
		return (
			<button key={song.songTitle} onClick={() => selectSong(song)}>
				{song.songTitle}
			</button>
		);
	};

	useEffect(() => {
		const hash =
			window.location.hash
				.substring(1)
				.split('&')
				.map((v) => v.split('='))
				.reduce(
					(pre, [key, value]) => ({ ...pre, [key]: value }),
					{},
				) || null;
		if (!spotifyState.accessToken && (!hash || !hash.access_token)) {
			window.location.href = `${SPOTIFY_API.AUTH_ENDPOINT}?client_id=${SPOTIFY_API.CLIENT_ID}&redirect_uri=${SPOTIFY_API.REDIRECT_URI}&response_type=${SPOTIFY_API.RESPONSE_TYPE}&scope=${SPOTIFY_API.SCOPE}`;
		} else {
			if (hash) {
				dispatch(spotifyActions.setAccessToken(hash.access_token));
			}
		}
	}, []);

	return (
		<div style={{ ...styles.container, width: '100%' }}>
			<div>
				{Playlists.find(
					(playlist) => playlist.NAME == 'Easy',
				).SONGS.map((song) => selector(song))}
			</div>
			<div style={{ width: '40%', textAlign: 'center' }}>
				<label htmlFor='spotify uri'>spotify uri:</label>
				<input
					type='text'
					id='spotify uri'
					name='spotify uri'
					value={spotifyURI}
					style={styles.input}
					onChange={(e) => setSpotifyURI(e.target.value)}
				/>
				<br />

				<label htmlFor='start time'>start time:</label>
				<input
					type='text'
					id='start time'
					name='start time'
					value={startTime}
					style={styles.input}
					onChange={(e) => setStartTime(Number(e.target.value))}
				/>
				<br />

				<label htmlFor='cut off time'>cut off time:</label>
				<input
					type='text'
					id='cut off time'
					name='cut off time'
					value={cutOffTime}
					style={styles.input}
					onChange={(e) => setCutOffTime(Number(e.target.value))}
				/>
				<br />

				<label htmlFor='end time'>end time:</label>
				<input
					type='text'
					id='end time'
					name='end time'
					value={endTime}
					style={styles.input}
					onChange={(e) => setEndTime(Number(e.target.value))}
				/>
			</div>
			<div>
				<button
					disabled={playPartialSong || playFullSong}
					onClick={() => setPlayPartialSong(true)}>
					Play partial song
				</button>
				<button
					disabled={playPartialSong || playFullSong}
					onClick={() => setPlayFullSong(true)}>
					Play full song
				</button>
				<button onClick={replaceSongData}>replace song data</button>
			</div>
			<HiddenPlayer
				playPartialSong={playPartialSong}
				playFullSong={playFullSong}
				songData={songData}
				stopSong={stopSong}
			/>
		</div>
	);
}
