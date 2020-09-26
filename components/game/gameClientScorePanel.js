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
		padding: '0px 10px',
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
			<th style={{ ...styles.listItem, fontWeight: 600 }} key={'title'}>
				Name
			</th>
		);
		clientAlias = [
			clientAlias,
			...gameState.clients.map((client) =>
				gameState.turnOrder.includes(client.socketId) ? (
					<td
						style={{
							...styles.listItem,
							color: 'hsl(' + 360 * Math.random() + ',100%, 65%)',
						}}
						key={client.socketId}>
						{client.alias}
					</td>
				) : null,
			),
		];

		return clientAlias;
	};

	const clientsScore = () => {
		let clientScore = [
			<th style={{ ...styles.listItem, fontWeight: 600 }} key={'title'}>
				Score
			</th>,
		];

		clientScore = [
			clientScore,
			...gameState.clients.map((client) =>
				gameState.turnOrder.includes(client.socketId) ? (
					<td style={styles.listItem} key={client.socketId}>
						{client.score}
					</td>
				) : null,
			),
		];

		return clientScore;
	};

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
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Teko&display=swap');
			`}</style>
			<table
				style={{
					...styles.list,
					display: 'inline-block',
					margin: '0px 10px',
				}}>
				<tbody>{combineList(clientsScore(), clientsAlias())}</tbody>
			</table>
		</div>
	);
}
