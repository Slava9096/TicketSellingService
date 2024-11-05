var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var Ticket = db.ticket;
var Session = db.session;
var Movie = db.movie;

exports.findAll = (req, res) => {
	Ticket.findAll()
		.then(objects => {
			globalFunctions.sendResult(res, objects);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.create = (req, res) => {
	Ticket.create({
		seat: req.body.seat,
		status: req.body.status,
		price: req.body.price,
		sessionId: req.body.sessionId,
		orderId: req.body.orderId,
	}).then(object => {
		globalFunctions.sendResult(res, object);
	}).catch(err => {
		globalFunctions.sendError(res, err);
	})
};
exports.update = (req, res) => {
	Ticket.update({
		seat: req.body.seat,
		status: req.body.status,
		price: req.body.price,
		sessionId: req.body.sessionId,
		orderId: req.body.orderId,
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
	Ticket.destroy({
		where: {
			id: req.params.id
		}
	}).then(() => {
		globalFunctions.sendResult(res, 'Билет удален');
	}).catch(err => {
		globalFunctions.sendError(res, err);
	});
};
exports.findById = (req, res) => {
	Ticket.findOne({
		where: {
			id: req.params.id
		},
		include: [{
			model: Session,
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
exports.createMany = (req, res) => {
	Ticket.bulkCreate(req.body.tickets)
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};
exports.findFreeTickets = (req, res) => {
	Ticket.findAll({
		where: {
			status: "Свободно",
			sessionId: req.params.id,
		}
	})
		.then(object => {
			globalFunctions.sendResult(res, object);
		})
		.catch(err => {
			globalFunctions.sendError(res, err);
		})
};

exports.findByOrderId = (req, res) => {
	Ticket.findAll({
		where: {
			orderId: req.params.orderId,
		},
		include: [{
			model: Session,
			include: [{
				model: Movie,
				required: true
			}],
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

