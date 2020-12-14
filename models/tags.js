'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    tagName: DataTypes.STRING,
    linkId: DataTypes.INTEGER
  }, {});
  Tags.associate = function(models) {
    // associations can be defined here
    models.Tags.belongsTo(models.Link, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Tags;
};