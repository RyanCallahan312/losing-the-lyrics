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

	const turnOrder = () => {
		let turnOrderAlias = [
			<li style={{ ...styles.listItem, fontWeight: 600 }} key={'title'}>
				Turn Order
			</li>,
		];

		turnOrderAlias = [
			turnOrderAlias,
			...gameState.turnOrder.map((socketId) =>
				gameState.clients.some(
					(client) => client.socketId === socketId,
				) ? (
					<li
						style={{
							...styles.listItem,
							color: 'hsl(' + 360 * Math.random() + ',100%, 65%)',
						}}
						key={socketId}>
						{
							gameState.clients.find(
								(client) => client.socketId === socketId,
							).alias
						}
					</li>
				) : null,
			),
		];

		return turnOrderAlias;
	};

	const spacer = (uniqueVal) => (
		<li
			style={{ ...styles.listItem, textAlign: 'right' }}
			key={`spacer-${uniqueVal}`}>
			{'\t'}
		</li>
	);

	const getSpacers = () => {
		var i;
		var spacers = [];
		for (i = 2; i < gameState.turnOrder.length; i++) {
			spacers.push(spacer(i));
		}
		return spacers;
	};

	const turnDescriptors = [
		spacer(0),
		<li style={{ ...styles.listItem, textAlign: 'right' }} key='singing'>
			Singing
		</li>,
		<li style={{ ...styles.listItem, textAlign: 'right' }} key='onDeck'>
			On Deck
		</li>,
		...getSpacers(),
	];

	return (
		<div style={{ ...styles.subContainer, width: '30%', display: 'block' }}>
			<ul
				style={{
					...styles.list,
					display: 'inline-block',
					margin: '0px 10px',
				}}>
				{turnDescriptors}
			</ul>
			<ul
				style={{
					...styles.list,
					display: 'inline-block',
					margin: '0px 10px',
				}}>
				{turnOrder()}
			</ul>
		</div>
	);
}
