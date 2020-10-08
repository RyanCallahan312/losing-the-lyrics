const styles = {
	lyricsDisplay: {
		fontSize: 'calc(16px + 2.3vmax)',
		fontFamily: 'Cute Font',
		color: 'rgba(50,138,250, 1)',
		fontWeight: '600',
		textShadow: '1px 1px rgba(255,0,0,1)',
		textAlign: 'center',
	},
};

export default function LyricsDisplay({
	partialLyrics,
	fullLyrics,
	turnResults,
}) {
	return (
		<p style={styles.lyricsDisplay}>
			{turnResults ? fullLyrics : partialLyrics}
		</p>
	);
}
