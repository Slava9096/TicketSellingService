module.exports = (app) => {
	const user = require('../controller/user');
	app.get('/api/users', user.findAll)
		.post('/api/users', user.create);
	app.get('/api/user/:id', user.findById)
		.put('/api/user/:id', user.update)
		.delete('/api/user/:id', user.delete);
};
