var { authJwt } = require("../middleware");
module.exports = (app) => {
	const user = require('../controller/user');
	app.get('/api/users', [authJwt.verifyToken], user.findAll)
		.post('/api/users', user.create);
	app.get('/api/user/:id', [authJwt.verifyToken], user.findById)
		.put('/api/user/:id', [authJwt.verifyToken], user.update)
		.delete('/api/user/:id', [authJwt.verifyToken], user.delete);
};
