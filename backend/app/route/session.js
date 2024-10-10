module.exports = (app) => {
	const session = require('../controller/session');
	app.get('/api/sessions', session.findAll)
		.post('/api/sessions', session.create);
	app.get('/api/session/:id', session.findById)
		.put('/api/session/:id', session.update)
		.delete('/api/session/:id', session.delete);
};
