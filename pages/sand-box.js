import Card from '../components/shared/card';

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
};

export default function Sandbox() {
	const cards = (
		<div style={styles.container}>
			<Card
				title='Easy'
				description='This is an easy playlist that everyone should enjoy 😃'
				onClick={() => console.log('clicked!')}
			/>
			<Card
				title='Hard'
				description='Thar be pirates! These are some more uncommon songs but you still might stand a chance to make it out 🤔'
				onClick={() => console.log('clicked!')}
			/>
			<Card
				title='Karaoke Master'
				description='Good luck on this one 😅'
				onClick={() => console.log('clicked!')}
			/>
		</div>
	);

	return (
		<div style={{ ...styles.container, width: '100%' }}>
			{cards}
			{cards}
			{cards}
		</div>
	);
}
