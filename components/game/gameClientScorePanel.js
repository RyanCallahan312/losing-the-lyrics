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

export default function GameClientScorePanel({ gameState }) {
	//--redux hooks--

	//--state hooks--

	//--effect hooks--

	//--handlers--

	//--JSX--

	const clientsAlias = () => {
		let clientAlias = (
			<li style={{ ...styles.listItem, fontWeight: 600 }} key={'title'}>
				Name
			</li>
		);
		clientAlias = [
			clientAlias,
			...gameState.clients.map((client) =>
				gameState.turnOrder.includes(client.socketId) ? (
					<li
						style={{
							...styles.listItem,
							color: 'hsl(' + 360 * Math.random() + ',100%, 65%)',
						}}
						key={client.socketId}>
						{client.alias}
					</li>
				) : null,
			),
		];

		return clientAlias;
	};

	const clientsScore = () => {
		let clientScore = [
			<li style={{ ...styles.listItem, fontWeight: 600 }} key={'title'}>
				Score
			</li>,
		];

		clientScore = [
			clientScore,
			...gameState.clients.map((client) =>
				gameState.turnOrder.includes(client.socketId) ? (
					<li style={styles.listItem} key={client.socketId}>
						{client.score}
					</li>
				) : null,
			),
		];

		return clientScore;
	};

	return (
		<div style={{ ...styles.subContainer, width: '30%', padding: 0 }}>
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Teko&display=swap');
			`}</style>
			<ul style={styles.list}>{clientsAlias()}</ul>
			<ul style={styles.list}>{clientsScore()}</ul>
		</div>
	);
}
