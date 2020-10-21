import * as SONGS from './songs';
import SONG_DATA from './songData';

export default [
	{
		NAME: 'Easy',
		DESCRIPTION: 'This is an easy playlist that everyone should enjoy 😃',
		SONGS: [
			SONG_DATA[SONGS.OOPS_I_DID_IT_AGAIN],
			SONG_DATA[SONGS.REAL_SLIM_SHADY],
			SONG_DATA[SONGS.OLD_TOWN_ROAD],
			SONG_DATA[SONGS.SOMEBODY_THAT_I_USED_TO_KNOW],
			SONG_DATA[SONGS.TIK_TOK],
		],
	},
	{
		NAME: 'Hard',
		DESCRIPTION:
			'Thar be pirates! These are some more uncommon songs but you still might stand a chance to make it out 🤔',
		SONGS: [
			SONG_DATA[SONGS.OOPS_I_DID_IT_AGAIN],
			SONG_DATA[SONGS.REAL_SLIM_SHADY],
			SONG_DATA[SONGS.OLD_TOWN_ROAD],
			SONG_DATA[SONGS.SOMEBODY_THAT_I_USED_TO_KNOW],
			SONG_DATA[SONGS.TIK_TOK],
		],
	},
	{
		NAME: 'Karaoke Master',
		DESCRIPTION: 'Good luck on this one 😅',
		SONGS: [
			SONG_DATA[SONGS.OOPS_I_DID_IT_AGAIN],
			SONG_DATA[SONGS.REAL_SLIM_SHADY],
			SONG_DATA[SONGS.OLD_TOWN_ROAD],
			SONG_DATA[SONGS.SOMEBODY_THAT_I_USED_TO_KNOW],
			SONG_DATA[SONGS.TIK_TOK],
		],
	},
];
