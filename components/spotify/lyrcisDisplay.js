const styles = {
	lyricsDisplay: {
		fontSize: 'calc(16px + 2.4vmax)',
		fontFamily: 'Cute Font',
		color: 'rgba(50,138,250, 1)',
		fontWeight: '600',
		textShadow: '1px 1px rgba(255,0,0,1)',
	},
};

export default function LyricsDisplay({ lyrics }) {
	return <p style={styles.lyricsDisplay}>{lyrics}</p>;
}
