import { wrapper } from '../store/store';

const styles = {
	container: {
		flex: '0 1 auto',
		width: '100%',
		alignItems: 'center',
		justifyContents: 'center',
	},
	subContainer: {
		width: '45%',
		margin: '0 auto',
	},
	header: {
		fontFamily: 'Teko',
		textAlign: 'center',
		fontSize: '260%',
	},
	body: {
		fontFamily: 'Roboto',
		fontSize: '120%',
	},
};

const HowToPlay = () => {
	return (
		<div style={styles.container}>
			<div style={styles.subContainer}>
				<h1 id='losing-the-lyrics' style={styles.header}>
					Losing The Lyrics
				</h1>
				<p style={styles.body}>
					Losing the lyrics is a game based on the TV show Don&#39;t
					Forget The Lyrics and you use it like a jackbox style game.
				</p>
				<p style={styles.body}>
					The goal of the game is to finish singing the line in a song
					karaoke style after the music stops.
				</p>
				<p style={styles.body}>
					The branch being hosted is an outdated version. The
					currently worked on branch is the front-end refactor.
				</p>
				<p style={styles.body}>
					<strong>
						<em>
							Voice Recognition works using the Web Speech Api.
							This api is not available in safari and must be
							enabled on spotify. This app will not work without
							this!
						</em>
					</strong>
				</p>
				<h2 id='how-to-create-a-game' style={styles.header}>
					How to create a game
				</h2>
				<p style={styles.body}>
					To create a game press the host game button and authenticate
					with your spotify premium account. The game will then link
					with your spotify account to play audio through the host
					device.
				</p>
				<p style={styles.body}>
					<strong>
						<em>
							THE LYRICS AND AUDIO IS ONLY PLAYED THROUGH THE HOST
							DEVICE
						</em>
					</strong>
				</p>
				<p style={styles.body}>
					After authenticating you will see a room code that players
					can use to join.
				</p>
				<p style={styles.body}>
					When everyone is in the game you can start the game then
					select a playlist of pre-selected songs then the game will
					start playing.
				</p>
				<p style={styles.body}>
					<em>
						I&#39;m currently looking for a solution to be able to
						use a spotify playlist from the host account but its
						difficulty trying to select a memorable part of a song
						and find lyrics to sync up with it
					</em>{' '}
				</p>
				<h2 id='how-to-play' style={styles.header}>
					How to play
				</h2>
				<p style={styles.body}>
					Once the game start the game will start showing lyrics on
					the host device along with music. Players will have a set
					amount of time to complete the phrase.
				</p>
				<p style={styles.body}>
					One point is awarded for partial correctness and three if
					you get it perfectly correct.
				</p>
				<p style={styles.body}>
					At the end of how ever many rounds the scores will be
					displayed and the winner will be declared as the karaoke
					overlord and better than everyone else.
				</p>
				<h3 id='contact' style={styles.header}>
					contact
				</h3>
				<p style={styles.body}>
					If you have any questions open an issue or email me at{' '}
					<a href='mailto:Ryan@DevRyan.io'>Ryan@DevRyan.io</a>
				</p>
			</div>
		</div>
	);
};

export default wrapper.withRedux(HowToPlay);
