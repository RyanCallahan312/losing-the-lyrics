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

export default function GameTurnPanel({ gameState }) {
	//--redux hooks--

	//--state hooks--

	//--effect hooks--

	//--handlers--

	//--JSX--

	const turnOrder = () => {
		let turnOrderAlias = [
			<th
				style={{
					...styles.listItem,
					fontWeight: 600,
					textAlign: 'left',
				}}
				key={'title'}>
				Turn Order
			</th>,
		];

		turnOrderAlias = [
			turnOrderAlias,
			...gameState.turnOrder.map((socketId) =>
				gameState.clients.some(
					(client) => client.socketId === socketId,
				) ? (
					<td
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
					</td>
				) : null,
			),
		];

		return turnOrderAlias;
	};

	const headSpacer = (uniqueVal) => (
		<th
			style={{ ...styles.listItem, textAlign: 'right' }}
			key={`spacer-${uniqueVal}`}>
			{'\t'}
		</th>
	);

	const spacer = (uniqueVal) => (
		<td
			style={{ ...styles.listItem, textAlign: 'right' }}
			key={`spacer-${uniqueVal}`}>
			{'\t'}
		</td>
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
		headSpacer(0),
		<td style={{ ...styles.listItem, textAlign: 'right' }} key='singing'>
			Singing
		</td>,
		<td style={{ ...styles.listItem, textAlign: 'right' }} key='onDeck'>
			On Deck
		</td>,
		...getSpacers(),
	];

	const combineList = (left, right) => {
		let newList = [];
		for (let i = 0; i < left.length; i++) {
			newList.push(
				<tr>
					{left[i]}
					{right[i]}
				</tr>,
			);
		}
		return newList;
	};

	return (
		<div
			style={{
				...styles.subContainer,
				width: '30%',
				display: 'block',
				padding: 0,
			}}>
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Teko&display=swap');
			`}</style>
			<table
				style={{
					...styles.list,
					display: 'inline-block',
					margin: '0px 10px',
				}}>
				{combineList(turnDescriptors, turnOrder())}
			</table>
		</div>
	);
}
