var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize');
var Session = db.session;
var Movie = db.movie;
var Hall = db.hall;

exports.findAll = (req, res) => {
	Session.findAll({
		include: [{
			model: Movie,
			required: true
		},
		{
			model: Hall,
			required: true
		}
		]
	})
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.create = (req, res) => {
	Session.create({
		date: req.body.date,
		movieId: req.body.movieId,
		hallId: req.body.hallId,
	}).then(object => {
		globalFunctions.sendResult(res, object);
	}).catch(err => {
		globalFunctions.sendError(res, err);
	})
};
exports.update = (req, res) => {
	Session.update({
		date: req.body.date,
		movieId: req.body.movieId,
		hallId: req.body.hallId,
	},
		{
			where: {
				id: req.params.id
			}
		}
	).then(object => {
		globalFunctions.sendResult(res, object);
	}).catch(err => {
		globalFunctions.sendError(res, err);
	})
};
exports.delete = (req, res) => {
	Session.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		globalFunctions.sendResult(res, 'Сеанс удален');
	}).catch(err => {
		globalFunctions.sendError(res, err);
	});
};
exports.findById = (req, res) => {
	Session.findOne({
		where: {
			id: req.params.id
		},
		include: [{
			model: Movie,
			required: true
		},
		{
			model: Hall,
			required: true
		}
		]
	})
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.findMovieSessionsFromDate = (req, res) => {
	Session.findAll({
		where: {
			date: {
				[Op.gte]: req.params.date
			},
			movieId: req.params.movieId,
		},
		include: [{
			model: Hall,
			required: true
		}]
	})
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.findSessionsFromDate = (req, res) => {
	Session.findAll({
		where: {
			date: {
				[Op.gte]: req.params.date
			},
		},
		include: [{
			model: Hall,
			required: true
		}, {
			model: Movie,
			required: true
		}]
	})
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
