import * as SONGS from './songs';
import SONG_DATA from './songData';

export default [
	{
		NAME: 'Easy',
		DESCRIPTION: 'This is an easy playlist that everyone should enjoy 😃',
		WIP: false,
		SONGS: [
			SONG_DATA[SONGS.OOPS_I_DID_IT_AGAIN],
			SONG_DATA[SONGS.REAL_SLIM_SHADY],
			SONG_DATA[SONGS.OLD_TOWN_ROAD],
			SONG_DATA[SONGS.SOMEBODY_THAT_I_USED_TO_KNOW],
			SONG_DATA[SONGS.TIK_TOK],
			SONG_DATA[SONGS.RADIOACTIVE],
			SONG_DATA[SONGS.FIREWORK],
			SONG_DATA[SONGS.DYNAMITE],
			SONG_DATA[SONGS.GRENADE],
			SONG_DATA[SONGS.SOUL_SISTER],
			SONG_DATA[SONGS.FANCY],
			SONG_DATA[SONGS.CHEAP_THRILLS],
			SONG_DATA[SONGS.RUDE],
			SONG_DATA[SONGS.PAYPHONE],
			SONG_DATA[SONGS.HOTLINE_BLING],
		],
	},
	{
		NAME: 'Hard',
		DESCRIPTION:
			'Thar be pirates! These are some more uncommon songs but you still might stand a chance to make it out 🤔',
		WIP: true,
		SONGS: [],
	},
	{
		NAME: 'Karaoke Master',
		DESCRIPTION: 'Good luck on this one 😅',
		WIP: true,
		SONGS: [],
	},
];
