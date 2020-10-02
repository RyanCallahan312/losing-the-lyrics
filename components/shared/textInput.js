import { forwardRef } from 'react';

const styles = {
	extras: {
		display: 'block',
		border: '2px solid rgba(0,105,237, .6)',
		borderRadius: '16px',
		outline: 'none',
		cursor: 'text',
	},
	font: {
		color: 'rgba(0, 0, 0, .75)',
		textAlign: 'center',
	},
	size: {
		fontSize: 'calc(1.5vw + 12px)',
		minWidth: '150px',
		maxWidth: '12vw',
	},
	space: {
		padding: '5px',
		margin: '20px',
	},
	colorOne: {
		background: 'rgba(0,105,237, .04)',
	},
	colorTwo: {
		background: 'rgba(250,105,237, .04)',
	},
};

const TextInput = forwardRef((props, ref) => (
	<input
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
		className='TextInput'
		{...props}
	/>
));

export default TextInput;
