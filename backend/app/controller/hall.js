var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Hall = db.hall;

exports.findAll = (req, res) => {
	Hall.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.create = (req, res) => {
	Hall.create({
		hallNumber: req.body.hallNumber,
		seatsNumber: req.body.seatsNumber,
		type: req.body.type,
	}).then(object => {
		globalFunctions.sendResult(res, object);
	}).catch(err => {
		globalFunctions.sendError(res, err);
	})
};
exports.update = (req, res) => {
	Hall.update({
		hallNumber: req.body.hallNumber,
		seatsNumber: req.body.seatsNumber,
		type: req.body.type,
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
	Hall.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		globalFunctions.sendResult(res, 'Зал удален');
	}).catch(err => {
		globalFunctions.sendError(res, err);
	});
};
exports.findById = (req, res) => {
	Hall.findByPk(req.params.id)
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
