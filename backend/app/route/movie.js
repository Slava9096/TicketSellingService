var { authJwt } = require("../middleware");
module.exports = (app) => {
	const movie = require('../controller/movie');
	app.get('/api/movies', movie.findAll)
		.post('/api/movies', [authJwt.verifyToken], movie.create);
	app.get('/api/movie/:id', movie.findById)
		.put('/api/movie/:id', [authJwt.verifyToken], movie.update)
		.delete('/api/movie/:id', [authJwt.verifyToken], movie.delete);
};
