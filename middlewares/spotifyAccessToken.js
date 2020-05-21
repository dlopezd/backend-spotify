const cache = require('memory-cache');

const spotifyClient = require('../services/spotifyClient');

const CACHE_KEY = "APP_SPOTIFY_TOKEN"

var spotifyAccessToken = async (req, res, next) => {
    try {
        let authorizationInfo = cache.get(CACHE_KEY)
        if (!authorizationInfo) {
            console.log("NO HAY CACHE, CONSULTANDO");

            authorizationInfo = await spotifyClient.getToken();
            cache.put(CACHE_KEY, authorizationInfo, authorizationInfo.expires_in * 1000);
        }

        req.authorizationInfo = authorizationInfo;
        next();
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports.spotifyAccessToken = spotifyAccessToken;