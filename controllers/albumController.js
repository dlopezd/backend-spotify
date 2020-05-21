const NodeCache = require("node-cache");

const spotifyClient = require('../services/spotifyClient');
const { models } = require('../data_access/sequelize');


exports.find = async (req, res) => {
    try {

        const searchInfo = {
            q: req.query.q,
            type: "album",
            market: req.query.market,
            limit: req.query.limit,
            offset: req.query.offset
        }
        let albumsSpotify = await spotifyClient.search(searchInfo, req.authorizationInfo)

        let albumsDb = await saveAlbumsOnDb(albumsSpotify);

        res.send({ ok: true, error: null, data: albumsDb });
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw(error);
    }
}


const saveAlbumsOnDb = async (albumsSpotify) => {
    try {
        if (!albumsSpotify) { throw new Error("Sin resultados para la búsqueda.") }

        const albumsDb = [];
        const length = albumsSpotify.albums.items.length;

        for (let i = 0; i < length; i++) {
            let albumSpotify = albumsSpotify.albums.items[i];

            var albumDb = await models.albums.findOne({ where: { lala: albumSpotify.id } });
            if (!albumDb) {
                albumDb = models.albums.build();
            }

            albumDb.id = albumSpotify.id;
            albumDb.album_type = albumSpotify.album_type;
            albumDb.artists = albumSpotify.artists.map(artist => artist.name).join(', ');
            albumDb.href = albumSpotify.href;
            albumDb.image = albumSpotify.images[1].url;
            albumDb.name = albumSpotify.name;
            albumDb.release_date = albumSpotify.release_date;
            albumDb.release_date_precision = albumSpotify.release_date_precision;
            albumDb.total_tracks = albumSpotify.total_tracks;
            albumDb.type = albumSpotify.type;
            albumDb.uri = albumSpotify.uri;

            if (albumDb.changed()) {
                await albumDb.save();
            }
            albumsDb.push(albumDb);
        }

        return albumsDb;
    }
    catch (error) {
        error.statuscode = 500;
        throw error;
    }
}