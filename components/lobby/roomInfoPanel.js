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
		fontSize: 'calc(20px + 1vh)',
	},
	list: { margin: 0, padding: 0 },
};

export default function LobbyPannel({ gameState }) {
	//--redux hooks--

	//--state hooks--

	//--effect hooks--

	//--handlers--

	//--JSX--

	const clientsAlias = gameState.clients.map(
		(client) =>
			gameState.turnOrder.includes(client.socketId) && (
				<li
					style={{
						...styles.listItem,
						color: 'hsl(' + 360 * Math.random() + ',100%, 65%)',
					}}
					key={client.socketId}>
					{client.alias}
				</li>
			),
	);

	const clientsScore = gameState.clients.map(
		(client) =>
			gameState.turnOrder.includes(client.socketId) && (
				<li style={styles.listItem} key={client.socketId}>
					{client.score}
				</li>
			),
	);

	return (
		<div
			style={{ ...styles.subContainer, width: '-webkit-fill-available' }}>
			<ul style={styles.list}>{clientsAlias}</ul>
			<ul style={styles.list}>{clientsScore}</ul>
		</div>
	);
}
