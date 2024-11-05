var { authJwt } = require("../middleware");
module.exports = (app) => {
	const ticket = require('../controller/ticket');
	app.get('/api/tickets/orderId=:orderId', [authJwt.verifyToken], ticket.findByOrderId)
	app.get('/api/tickets', [authJwt.verifyToken], ticket.findAll)
		.post('/api/tickets', [authJwt.verifyToken], ticket.createMany)
	app.get('/api/ticket/:id', [authJwt.verifyToken], ticket.findById)
		.put('/api/ticket/:id', [authJwt.verifyToken], ticket.update)
		.delete('/api/ticket/:id', [authJwt.verifyToken], ticket.delete);
	app.post('/api/ticket', [authJwt.verifyToken], ticket.create);
	app.get('/api/ticketsFree/:id', ticket.findFreeTickets)
};
