const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hall', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    hallNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seatsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'hall',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
