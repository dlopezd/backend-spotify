const spotifyClient = require('../services/spotifyClient')


exports.find = async (req, res) => {
    try {
        let authorizationInfo = await spotifyClient.getToken();

        const searchInfo = {
            q: req.query.q,
            type: "album",
            market: req.query.market,
            limit: req.query.limit,
            offset: req.query.offset
        }

        let albums = await spotifyClient.search(searchInfo, authorizationInfo)

        res.send({ ok: true, error: null, data: albums });
    } catch (error) {
        res.send({ ok: false, error: error, data: null });
    }
}