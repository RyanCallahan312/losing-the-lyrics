const styles = {
	results: {
		fontFamily: 'Cute Font',
		color: 'rgba(50,138,250, 1)',
		fontWeight: '600',
		textShadow: '1px 1px rgba(255,0,0,1)',
		fontSize: 'calc(30px + .5vmax)',
	},
	info: {
		fontFamily: 'Teko',
		textAlign: 'center',
		fontSize: 'calc(20px + .5vmax)',
	},
};

export default function TurnResultsDisplay({ turnResults, currentTurnClient }) {
	return (
		<p style={styles.info}>
			{currentTurnClient.alias} scored{' '}
			<span style={styles.results}>{turnResults.score} points</span>
			with <span style={styles.results}>"{turnResults.transcript}"</span>
		</p>
	);
}
