var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require('./app/config/db.config.js');

db.sequelize.sync({ force: false });

var user = require('./app/route/user');
user(app);

var hall = require('./app/route/hall');
hall(app);

var movie = require('./app/route/movie');
movie(app);

var session = require('./app/route/session');
session(app);

var ticket = require('./app/route/ticket');
ticket(app);

var order = require('./app/route/order');
order(app);

app.listen(3000);
