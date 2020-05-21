const Sequelize = require('sequelize');
const config = require('config');
/* loading the models */
var fs = require('fs');
var path = require('path');

const sequelize = new Sequelize( process.env.DATABASE_URL,    
    {
        dialect: config.db.dialect,
        ssl: true,
        dialectOptions: {
            decimalNumbers: true,
            ssl: { require: true }
        }
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