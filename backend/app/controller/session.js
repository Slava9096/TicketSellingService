var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Session = db.session;

exports.findAll = (req, res) => {
	Session.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
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
	Session.findByPk(req.params.id)
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
