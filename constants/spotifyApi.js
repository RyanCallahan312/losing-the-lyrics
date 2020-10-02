export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
export const RESPONSE_TYPE = 'token';
export const REDIRECT_URI = encodeURIComponent(
	process.env.NEXT_PUBLIC_REDIRECT_URI,
);
export const SCOPE = encodeURIComponent('streaming');
