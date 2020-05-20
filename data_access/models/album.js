var path = require('path');

module.exports = function (sequelize, DataTypes) {
  const Album = sequelize.define('albums', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    album_type: DataTypes.STRING,
    artists: DataTypes.STRING,
    href: DataTypes.STRING,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    release_date: DataTypes.DATEONLY,
    release_date_precision: DataTypes.STRING,
    total_tracks: DataTypes.INTEGER,
    type: DataTypes.STRING,
    uri: DataTypes.STRING
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });

  return Album;

}