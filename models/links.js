'use strict';
module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    link: DataTypes.STRING,
  }, {});
  Link.associate = function(models) {
    // associations can be defined here
    models.Link.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
    models.Link.hasMany(models.Likes)
  };
  return Link;
};