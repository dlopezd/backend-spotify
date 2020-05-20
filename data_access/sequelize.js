const Sequelize = require('sequelize');
const config = require('config');
/* loading the models */
var fs = require('fs');
var path = require('path');

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        ssl: true,
        dialectOptions: {
            decimalNumbers: true,
            ssl: { require: true }
        },
        port: config.db.port,
        "ssl": true, "dialectOptions": { "ssl": { "require": true } }
    }
);

var models = {};
fs.readdirSync('data_access/models').forEach(function (filename) {
    var model = {};
    model.path = path.join(__dirname, '/models', filename)
    model.name = filename.replace(/\.[^/.]+$/, "");
    model.resource = sequelize.import(model.path);
    models[model.name] = model;
});

module.exports = sequelize;