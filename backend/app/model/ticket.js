const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(15,2),
      allowNull: false
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'session',
        key: 'id'
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'userOrder',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ticket',
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
        name: "TicketToSession",
        using: "BTREE",
        fields: [
          { name: "sessionId" },
        ]
      },
      {
        name: "TicketToOrder",
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
    ]
  });
};
