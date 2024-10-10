var DataTypes = require("sequelize").DataTypes;
var _hall = require("./hall");
var _movie = require("./movie");
var _session = require("./session");
var _ticket = require("./ticket");
var _user = require("./user");
var _userOrder = require("./userOrder");

function initModels(sequelize) {
  var hall = _hall(sequelize, DataTypes);
  var movie = _movie(sequelize, DataTypes);
  var session = _session(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userOrder = _userOrder(sequelize, DataTypes);

  session.belongsTo(hall, { foreignKey: "hallId" });
  session.belongsTo(movie, { foreignKey: "movieId" });
  ticket.belongsTo(userOrder, { foreignKey: "orderId" });
  ticket.belongsTo(session, { foreignKey: "sessionId" });
  userOrder.belongsTo(user, { foreignKey: "userId" });

  hall.hasMany(session, { foreignKey: "hallId", onDelete: "CASCADE" });
  movie.hasMany(session, { foreignKey: "movieId", onDelete: "CASCADE" });
  session.hasMany(ticket, { foreignKey: "sessionId", onDelete: "CASCADE" });
  user.hasMany(userOrder, { foreignKey: "userId", onDelete: "CASCADE" });
  userOrder.hasMany(ticket, { foreignKey: "orderId", onDelete: "CASCADE" });

  return {
    hall,
    movie,
    session,
    ticket,
    user,
    userOrder,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
