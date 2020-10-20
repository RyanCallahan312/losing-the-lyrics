const styles = {
	staticContainer: {
		position: 'absolute',
		left: '50%',
		transform: 'translate(-50%, 0)',
	},
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
		<div style={styles.staticContainer}>
			<p style={styles.info}>
				<span
					style={{
						color: 'hsl(' + currentTurnClient.color + ',100%, 65%)',
					}}>
					{currentTurnClient.alias}
				</span>{' '}
				scored{' '}
				<span style={styles.results}>{turnResults.score} points</span>{' '}
				with{' '}
				<span style={styles.results}>"{turnResults.transcript}"</span>
			</p>
		</div>
	);
}
