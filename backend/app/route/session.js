var { authJwt } = require("../middleware");
module.exports = (app) => {
	const session = require('../controller/session');
	app.get('/api/sessions/date=:date&movie=:movieId', session.findMovieSessionsFromDate)
	app.get('/api/sessions', session.findAll)
		.post('/api/sessions', [authJwt.verifyToken], session.create);
	app.get('/api/session/:id', session.findById)
		.put('/api/session/:id', [authJwt.verifyToken], session.update)
		.delete('/api/session/:id', [authJwt.verifyToken], session.delete);
};
