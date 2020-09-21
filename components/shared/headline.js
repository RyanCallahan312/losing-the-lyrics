const styles = {
	extras: {
		borderRadius: '100px',
	},
	font: {
		fontFamily: 'Cute Font',
		color: 'rgba(50,138,250, 1)',
	},
	size: {
		fontSize: 'calc(8vw + 40px)',
	},
	space: {
		padding: '5px',
		margin: '20px',
	},
	button: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		overflow: 'hidden',
	},
};
const Headline = React.forwardRef((props, ref) => (
	<button
		onClick={props.onClick}
		href={props.href}
		ref={ref}
		style={styles.button}>
		<h1
			style={{
				...styles.font,
				...styles.size,
				...styles.space,
				...styles.extras,
				...(props.style ? props.style : {}),
			}}
			className='headline'>
			{props.children}
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Cute+Font&display=swap');

				.headline {
					animation: glow 1.15s ease-in-out 0s infinite alternate,
						rotate-and-scale 1.15s ease-in-out 0s infinite alternate;
				}

				@keyframes rotate-and-scale {
					0% {
						transform: rotate(4deg) scale(1);
					}
					100% {
						transform: rotate(2deg) scale(1.05);
					}
				}
				@keyframes glow {
					0% {
						text-shadow: 3px 3px rgba(255, 0, 0, 1),
							0 0 0 rgba(0, 113, 255, 0);
					}
					100% {
						text-shadow: 3px 3px rgba(255, 0, 0, 1),
							0 0 5vh rgb(0, 113, 255, 0.95);
					}
				}
			`}</style>
		</h1>
	</button>
));

export default Headline;
