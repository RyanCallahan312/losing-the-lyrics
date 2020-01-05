import PropTypes from 'prop-types';

const styles = {
	extras: {
		transform: 'rotate(4deg)'
	},
	font: {
		fontFamily: 'Cute Font',
		color: 'rgba(50,138,250, 1)',
		textShadow: '3px 3px #ff0000'
	},
	size: {
		fontSize: 'calc(8vw + 40px)'
	},
	whiteSpace: {
		padding: '5px',
		margin: '20px'
	}
};

export default function Headline(props) {
	return (
		<h1
			style={{
				...styles.font,
				...styles.size,
				...styles.whiteSpace,
                ...styles.extras,
                ...(props.style ? props.style : {})
			}}
		>
			{props.children}
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Cute+Font&display=swap');
			`}</style>
		</h1>
	);
}

Headline.propTypes = {
	children: PropTypes.string.isRequired
};
