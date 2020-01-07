const styles = {
	extras: {
		display: 'block',
		border: 'none',
		borderRadius: '22px',
	},
	font: {
		fontFamily: 'Teko',
		color: 'rgba(255, 255, 255, 1)'
	},
	size: {
		fontSize: 'calc(2.4vw + 12px)',
		minWidth: '5vw',
		maxWidth: '12vw'
	},
	space: {
		padding: '5px',
		margin: '20px'
	},
	colorOne:{
		background: 'rgba(0,105,237, .7)'
	},
	colorTwo:{

	}
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
			...(props.color ? props.color == 1 ? styles.colorOne : styles.colorTwo : {})
		}}
	>
		{props.children}
		<style jsx>{`
			@import url('https://fonts.googleapis.com/css?family=Teko&display=swap');
		`}</style>
	</button>
));

export default Button;
