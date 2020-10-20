import PLAYLISTS from '../../constants/playlists';
import Card from '../shared/card';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
	},
	subContainer: {
		height: 'auto',
		flex: '0 1 auto',
		display: 'block',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: 5,
		width: 'fit-content',
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
	listItem: {
		listStyleType: 'none',
		fontFamily: 'Teko',
		fontSize: 'calc(20px + 1.4vh)',
	},
	list: { margin: 0, padding: 0 },
	clickableDiv: {
		background: 'none',
		color: 'inherit',
		border: 'none',
		padding: 0,
		outline: 'none',
	},
};

export default function PlaylistSelector({ handleSelectPlaylist }) {
	//--redux hooks--

	//--state hooks--

	//--effect hooks--

	//--handlers--

	//--JSX--

	const song = (songData) => {
		return (
			<li
				key={`${songData.songTitle} - ${songData.artist}`}>{`${songData.songTitle} - ${songData.artist}`}</li>
		);
	};

	//TODO: turn playlist into cards rather than buttons

	const playlist = (rawPlaylist) => (
		<Card
			key={rawPlaylist.NAME}
			onClick={() => handleSelectPlaylist(rawPlaylist)}
			title={rawPlaylist.NAME}
			description={rawPlaylist.DESCRIPTION}
		/>
	);

	return PLAYLISTS.map((rawPlaylist) => playlist(rawPlaylist));
}
