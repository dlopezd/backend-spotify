const spotifyClient = require('../services/spotifyClient')


exports.find = async (req, res) => {
    try {
        let token = await spotifyClient.getToken();
        res.send({ ok: true, error: null, data: {...token} });
    } catch (error) {
        res.send({ ok: false, error: error, data: null });
    }
}