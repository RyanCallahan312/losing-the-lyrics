const styles = {
	container: {
		textAlign: 'center',
		height: 'inherit',
	},
	button: {
		cursor: 'pointer',
		background: 'rgba(255,255,255,1)',
		minWidth: '180px',
		maxWidth: '200px',
		height: '280px',
		outline: 'none',
		border: '2px solid black',
		borderRadius: '18px',
	},
	headerText: {
		fontSize: 'calc(1.2vw + 18px)',
		fontFamily: 'Teko',
		color: 'rgba(50,138,250, 1)',
		textShadow:
			'2px 2px rgba(255, 0, 0, 1), 0 0 6px rgba(0, 113, 255, 0.85)',
		marginBlockStart: '10px',
		marginBlockEnd: '10px',
	},
	description: {
		fontSize: 'calc(0.4vw + 14px)',
		fontFamily: 'Teko',
		marginBlockStart: '10px',
		marginBlockEnd: 'auto',
	},
};

export default function Card({ title, description, onClick }) {
	return (
		<button
			className='button'
			style={styles.button}
			onClick={onClick ?? null}>
			<div style={styles.container}>
				<h1 style={styles.headerText}>{title}</h1>
				<p style={styles.description}>{description}</p>
			</div>
			<style jsx global>{`
				.button {
					box-shadow: 0px 0px 0px rgba(0, 113, 255, 0);
					transform: scale(1);
					transition: 150ms transform ease-out,
						150ms boxshadow ease-out;
				}

				.button:hover {
					box-shadow: 0px 0px 18px rgba(0, 113, 255, 0.5);
					transform: scale(1.02);
					transition: 150ms transform ease-out,
						150ms boxshadow ease-out;
				}
			`}</style>
		</button>
	);
}
