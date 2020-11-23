'use strict';
module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    link: DataTypes.STRING,
  }, {});
  Link.associate = function(models) {
    // associations can be defined here
    models.Link.hasMany(models.Likes)
    models.Link.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Link;
};