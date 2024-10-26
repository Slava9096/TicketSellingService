var { authJwt } = require("../middleware");
module.exports = (app) => {
	const hall = require('../controller/hall');
	app.get('/api/halls', hall.findAll)
		.post('/api/halls', [authJwt.verifyToken], hall.create);
	app.get('/api/hall/:id', hall.findById)
		.put('/api/hall/:id', [authJwt.verifyToken], hall.update)
		.delete('/api/hall/:id', [authJwt.verifyToken], hall.delete);
};
