const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('session', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    hallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hall',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'session',
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
      {
        name: "SessionToHall",
        using: "BTREE",
        fields: [
          { name: "hallId" },
        ]
      },
      {
        name: "SessionToMovie",
        using: "BTREE",
        fields: [
          { name: "movieId" },
        ]
      },
    ]
  });
};
