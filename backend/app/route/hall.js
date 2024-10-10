module.exports = (app) => {
	const hall = require('../controller/hall');
	app.get('/api/halls', hall.findAll)
		.post('/api/halls', hall.create);
	app.get('/api/hall/:id', hall.findById)
		.put('/api/hall/:id', hall.update)
		.delete('/api/hall/:id', hall.delete);
};
