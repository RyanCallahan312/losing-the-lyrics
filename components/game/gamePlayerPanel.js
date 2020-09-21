import Link from 'next/link';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useCallback, useState, useEffect } from 'react';
import Button from '../shared/button';
import TextInput from '../shared/textInput';
import * as gameActions from '../../store/game/actions';
import { createRoom } from '../../socket/emissions';

const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
	},
	subContainer: {
		height: 'auto',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'row',
		padding: 20,
	},
	button: {
		width: '100%',
		minWidth: '200px',
	},
	listItem: {
		listStyleType: 'none',
		fontFamily: 'Teko',
		fontSize: 'calc(20px + 1.4vh)',
	},
	list: { margin: 0, padding: 0 },
};

export default function GamePlayerPanel({ isSinging }) {
	//--redux hooks--

	//--state hooks--

	//--effect hooks--

	//--handlers--

	//--JSX--

	const indicator = isSinging ? (
		<h1 style={styles.listItem}>active microphone svg goes here</h1>
	) : (
		<h3 style={styles.listItem}>disabled microphone svg goes here</h3>
	);

	return (
		<div style={{ ...styles.subContainer, width: '30%', padding: 0 }}>
			{indicator}
		</div>
	);
}
