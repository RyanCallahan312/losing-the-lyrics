import React from "react";

const play = ({
    spotify_uri,
    playerInstance: {
        _options: { getOAuthToken, id }
    }
}) => {
    getOAuthToken(access_token => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: "PUT",
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        });
    });
};

export default function HiddenPlayer(props) {
    console.log(props);
    React.useEffect(() => {
        console.log("hidden player window log norm", window);
        console.log(
            "hidden player window log spec",
            window.SpotifyPlayerProvider
        );

        play({
            playerInstance: window.SpotifyPlayerProvider,
            spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr"
        });
    }, []);
    return null;
}
