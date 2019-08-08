const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const keys = require('../config');
const roomHandler = require('../server');
const router = express.Router();

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible[Math.floor(Math.random() * possible.length)];
  }
  return text;
};
const parseTracks = (items) => {
   let res = [];

   for (let i = 0; i < items.length; i++){
      let current = items[i];
      let temp = {
         title: current.name,
         artist: current.artists[0].name,
         album: current.album.name,
         length: current.duration_ms,
         album_pic_url: current.album.images[1].url,
         uri: current.uri
      };
      res.push(temp);
   }

   return res;
}

// Returns a URL to Spotify where the user
// can login to connect their account
router.post("/connect", (req, res) => {
	// Generate state and store it to validate
	// request after Spotify callback
	const state = generateRandomString(16);
	res.cookie(keys.SPOTIFY_STATE_KEY, state);

	// Define necessary params and scope for the Spotify API
	const scope = 'user-read-currently-playing user-library-read user-modify-playback-state streaming user-read-private';
	const url = "https://accounts.spotify.com/authorize?";
	const params = querystring.stringify({
		response_type: 'code',
		client_id: keys.SPOTIFY_CLIENT_ID,
		scope: scope,
		redirect_uri: 'http://localhost:3000/spotify',
		state: state
	});

	// Return the url to be redirected to
	return res.status(200).json(url + params);
});

// Returns Spotify access token, refresh token,
// and date representing when the tokens were received.
router.post("/callback", (req, res) => {
   // Initialize variables to be used
	const user = req.body.user;
	const code = req.body.code || null;
	const state = req.body.state || null;
	const stored_state = req.cookies ? req.cookies[keys.SPOTIFY_STATE_KEY] : null;

   // Reaffirm that the state passed is the
   // same as the state that was stored.
	if (state === stored_state){
		res.clearCookie(keys.SPOTIFY_STATE_KEY);

      // Initialize params for API call
		const url = "https://accounts.spotify.com/api/token";
		const params = querystring.stringify({
			code: code,
			redirect_uri: 'http://localhost:3000/spotify',
			grant_type: 'authorization_code'
		});
		const header = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Basic ' + keys.SPOTIFY_API_TOKEN
			}
		};

      // Make a call to the Spotify API to get
      // access and refresh tokens
		axios.post(url, params, header).then((response) => {
			const { access_token, refresh_token } = response.data;
         const spotify_exp = Math.floor(Date.now() / 1000);

         // Return access token, refresh toke, and date
			return res.status(200).json({ access_token, refresh_token, spotify_exp });
		}).catch((err) => {
			return res.status(400).json(err);
		});
	} else {
		return res.status(500).json({ error: "State mismatch" });
	}
});

// Searches for the song requested by the user
router.post("/search", (req, res) => {
   const { user, q } = req.body;

   const params = querystring.stringify({
      q: q,
      type: 'track'
   });
   const url = "https://api.spotify.com/v1/search?";
   const header = {
      headers: {
         'Authorization': 'Bearer ' + (user.spotify_access_token)
      }
   };

   axios.get(url + params, header).then((raw) => {
      const { items } = raw.data.tracks;
      const tracks = parseTracks(items);
      return res.status(200).json({ tracks });
   }).catch((err) => {
      console.log(err);
      return res.status(500).json({ err });
   });
});

// Returns an updated user, with new tokens
router.post("/refresh", (req, res) => {
   const user = req.body;
   const url = "https://accounts.spotify.com/api/token";
   const params = querystring.stringify({
      refresh_token: user.spotify_refresh_token,
      grant_type: 'refresh_token'
   });
   const header = {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + keys.SPOTIFY_API_TOKEN
      }
   };

   axios.post(url, params, header).then((raw) => {
      const { access_token } = raw.data;
      const spotify_exp = Math.floor(Date.now() / 1000);
      let updated = {...user, spotify_access_token: access_token, spotify_exp}
      return res.status(200).json(updated);
   }).catch((err) => {
      console.log("error in refresh");
      console.log(err);
      return res.status(500).json({ err });
   });
})

module.exports = router;
