module.exports = (app) => {
	const ticket = require('../controller/ticket');
	app.get('/api/tickets', ticket.findAll)
		.post('/api/tickets', ticket.create);
	app.get('/api/ticket/:id', ticket.findById)
		.put('/api/ticket/:id', ticket.update)
		.delete('/api/ticket/:id', ticket.delete);
};
