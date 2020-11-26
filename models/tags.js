'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    tagName: DataTypes.STRING
  }, {});
  Tags.associate = function(models) {
    // associations can be defined here
    models.Link.belongsTo(models.Link, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Tags;
};