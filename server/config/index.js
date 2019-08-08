const MONGO_URI = "mongodb+srv://andymina:incorrect@master-oxjle.mongodb.net/test?retryWrites=true&w=majority";
const SECRET_OR_KEY = "secret";
const SPOTIFY_CLIENT_ID = "8dfd3782d06b4e9d8b19a0043704aa36";
const SPOTIFY_CLIENT_SECRET = "b2820f809dc54ceda741265c726e0c79";
const SPOTIFY_REDIRECT = "http://localhost:5000/api/spotify/callback";
const SPOTIFY_STATE_KEY = "spotify_auth_state";
const SPOTIFY_API_TOKEN = Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64');

module.exports = {
	MONGO_URI,
	SECRET_OR_KEY,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIRECT,
	SPOTIFY_STATE_KEY,
	SPOTIFY_API_TOKEN
};
