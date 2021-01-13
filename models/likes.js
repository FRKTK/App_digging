'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    liked: DataTypes.BOOLEAN
  }, {});
  Likes.associate = function(models) {
    // associations can be defined here
    models.Likes.belongsTo(models.Link, {
      foreignKey: {
        allowNull: false
      }
    }),
    models.Likes.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Likes;
};