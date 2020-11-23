'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
  }, {});
  Likes.associate = function(models) {
    // associations can be defined here
    models.Link.belongsTo(models.Link, {
      foreignKey: {
        allowNull: false
      }
    }),
    models.Link.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Likes;
};