const styles = {
	header: {
		fontFamily: 'Cute Font',
		color: 'rgba(50,138,250, 1)',
		fontWeight: '600',
		textShadow: '1px 1px rgba(255,0,0,1)',
		fontSize: 'calc(16px + 2.6vmax)',
	},
};

export default function GameRoundTransitionSplash({ roundNumber }) {
	return <h1 style={styles.header}>ROUND {roundNumber}</h1>;
}
