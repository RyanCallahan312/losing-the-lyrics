const styles = {
	extras: {
		display: 'block',
		border: 'none',
		borderRadius: '16px',
		outline: 'none',
		cursor: 'pointer',
	},
	font: {
		fontFamily: 'Teko',
		color: 'rgba(255, 255, 255, 1)',
	},
	size: {
		fontSize: 'calc(2.4vw + 12px)',
		minWidth: '150px',
		maxWidth: '12vw',
	},
	space: {
		padding: '5px',
		margin: '20px',
	},
	colorOne: {
		background: 'rgba(0,105,237, .7)',
	},
	colorTwo: {
		background: 'rgba(250,105,237, .7)',
	},
};

const Button = React.forwardRef((props, ref) => (
	<button
		onClick={props.onClick}
		href={props.href}
		ref={ref}
		style={{
			...styles.font,
			...styles.size,
			...styles.space,
			...styles.extras,
			...(props.style ? props.style : {}),
			...(props.color
				? props.color == 1
					? styles.colorOne
					: styles.colorTwo
				: styles.colorOne),
		}}
		className='button'>
		{props.children}
		<style jsx global>{`
			@import url('https://fonts.googleapis.com/css?family=Teko&display=swap');
			.button {
				box-shadow: 0px 0px 0px rgba(0, 113, 255, 0);
				transform: scale(1);
				transition: 150ms transform ease-out, 150ms boxshadow ease-out;
			}

			.button:hover {
				box-shadow: 0px 0px 18px rgba(0, 113, 255, 0.5);
				transform: scale(1.02);
				transition: 150ms transform ease-out, 150ms boxshadow ease-out;
			}
		`}</style>
	</button>
));

export default Button;
