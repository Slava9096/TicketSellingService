module.exports = (app) => {
	const order = require('../controller/order');
	app.get('/api/orders', order.findAll)
		.post('/api/orders', order.create);
	app.get('/api/order/:id', order.findById)
		.put('/api/order/:id', order.update)
		.delete('/api/order/:id', order.delete);
};
