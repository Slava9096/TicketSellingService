module.exports = (app) => {
	const movie = require('../controller/movie');
	app.get('/api/movies', movie.findAll)
		.post('/api/movies', movie.create);
	app.get('/api/movie/:id', movie.findById)
		.put('/api/movie/:id', movie.update)
		.delete('/api/movie/:id', movie.delete);
};
