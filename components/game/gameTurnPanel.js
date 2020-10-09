const styles = {
	container: {
		height: '50vh',
		flex: '0 1 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		flexDirection: 'column',
		minWidth: '300px',
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
		minWidth: '300px',
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
		let turnOrderHeader = (
			<th
				style={{
					...styles.listItem,
					fontWeight: 600,
					textAlign: 'left',
				}}
				key={'title'}>
				Turn Order
			</th>
		);

		let turnOrderAlias = gameState.turnOrder.map((socketId) =>
			gameState.clients.find((client) => client.socketId === socketId),
		);

		turnOrderAlias = turnOrderAlias.map((client) => (
			<td
				style={{
					...styles.listItem,
					color: 'hsl(' + client.color + ',100%, 65%)',
				}}
				key={`alias-${client.socketId}`}>
				{client.alias}
			</td>
		));

		return [turnOrderHeader, ...turnOrderAlias];
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

	const getSpacers = (amount) => {
		var i;
		var spacers = [];
		for (i = 0; i < amount; i++) {
			spacers.push(spacer(i * amount));
		}
		return spacers;
	};

	const turnDescriptors = (currentTurn, turnOrderList) => {
		let currentTurnIndex = turnOrderList.findIndex(
			(socketId) => socketId === currentTurn,
		);

		if (currentTurnIndex === -1) {
			return [
				headSpacer(0),
				<td style={styles.listItem} key='singing'>
					Singing
				</td>,
				<td style={styles.listItem} key='onDeck'>
					On Deck
				</td>,
				...getSpacers(),
			];
		}

		console.log(currentTurnIndex, turnOrderList.length);

		let descriptors = [headSpacer(0), ...getSpacers(currentTurnIndex - 1)];
		descriptors.push(
			<td style={styles.listItem} key='singing'>
				Singing
			</td>,
		);
		if (currentTurnIndex !== turnOrderList.length - 1) {
			descriptors.push(
				<td style={styles.listItem} key='onDeck'>
					On Deck
				</td>,
			);
		}
		console.log(
			`currentTurn ${currentTurnIndex}`,
			`turnOrderList ${turnOrderList.length}`,
			`descriptors ${descriptors.length}`,
		);
		descriptors = [
			...descriptors,
			...getSpacers(descriptors.length - turnOrderList.length - 1),
		];

		return descriptors;
	};
	// const turnDescriptors = [
	// 	headSpacer(0),
	// 	<td style={styles.listItem} key='singing'>
	// 		Singing
	// 	</td>,
	// 	<td style={styles.listItem} key='onDeck'>
	// 		On Deck
	// 	</td>,
	// 	...getSpacers(),
	// ];

	const combineList = (left, right) => {
		let newList = [];
		for (let i = 0; i < left.length; i++) {
			newList.push(
				<tr key={left[i] + right[i] + i} style={{ textAlign: 'left' }}>
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
				padding: 0,
				textAlign: 'center',
			}}>
			<table
				style={{
					...styles.list,
					display: 'inline-block',
					margin: '0px 10px',
				}}>
				<tbody>
					{combineList(
						turnDescriptors(
							gameState.currentTurn,
							gameState.turnOrder,
						),
						turnOrder(),
					)}
				</tbody>
			</table>
		</div>
	);
}
