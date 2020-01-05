import PropTypes from 'prop-types';

const styles = {
};

export default function Headline(props) {
	return (
		<h1
			style={{
				...styles.font,
				...styles.size,
				...styles.whiteSpace,
				...styles.extras
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
    children: PropTypes.string.isRequired,
    style: PropTypes.object
};
