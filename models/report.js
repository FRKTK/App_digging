'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    userId: DataTypes.INTEGER,
    linkId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
    models.Tags.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }),
    models.Tags.belongsTo(models.Link, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Report;
};