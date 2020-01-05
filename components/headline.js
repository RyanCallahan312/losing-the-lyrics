import PropTypes from 'prop-types';

const styles = {
	font: {
		fontFamily: 'Roboto'
	},
	size: {
		fontSize: 'calc(4.5vw + 40px)'
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
				...styles.whiteSpace
			}}
		>
			{props.children}
		</h1>
	);
}

Headline.propTypes = {
	children: PropTypes.string.isRequired
};
