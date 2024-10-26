var { authJwt } = require("../middleware");
module.exports = (app) => {
	const order = require('../controller/order');
	app.get('/api/orders', [authJwt.verifyToken], order.findAll)
		.post('/api/orders', [authJwt.verifyToken], order.create);
	app.get('/api/order/:id', [authJwt.verifyToken], order.findById)
		.put('/api/order/:id', [authJwt.verifyToken], order.update)
		.delete('/api/order/:id', [authJwt.verifyToken], order.delete);
};
