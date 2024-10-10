var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var User = db.user;

exports.findAll = (req, res) => {
	User.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.create = (req, res) => {
	User.create({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	}).then(object => {
		globalFunctions.sendResult(res, object);
	}).catch(err => {
		globalFunctions.sendError(res, err);
	})
};
exports.update = (req, res) => {
	User.update({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
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
	User.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		globalFunctions.sendResult(res, 'Пользователь удален');
	}).catch(err => {
		globalFunctions.sendError(res, err);
	});
};
exports.findById = (req, res) => {
	User.findByPk(req.params.id)
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
