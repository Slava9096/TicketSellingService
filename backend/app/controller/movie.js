var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Movie = db.movie;

exports.findAll = (req, res) => {
	Movie.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.create = (req, res) => {
	Movie.create({
		name: req.body.name,
		genre: req.body.genre,
		length: req.body.movieLength,
		description: req.body.description,
		releaseDate: req.body.releaseDate,
	}).then(object => {
		globalFunctions.sendResult(res, object);
	}).catch(err => {
		globalFunctions.sendError(res, err);
	})
};
exports.update = (req, res) => {
	Movie.update({
		name: req.body.name,
		genre: req.body.genre,
		length: req.body.movieLength,
		description: req.body.description,
		releaseDate: req.body.releaseDate,
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
	Movie.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		globalFunctions.sendResult(res, 'Фильм удален');
	}).catch(err => {
		globalFunctions.sendError(res, err);
	});
};
exports.findById = (req, res) => {
	Movie.findByPk(req.params.id)
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
