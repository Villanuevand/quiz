/**
* Quiz Controller  
*/

// GET /quizes/question
exports.question = function (req, res) {
	res.render('quizes/question', {pregunta: 'Capita de Italia'});
};

// GET /quizes/answer
exports.answer = function (req, res) {
	if(req.query.respuesta && req.query.respuesta.toLowerCase() == 'roma')
		res.render('quizes/answer', {respuesta : '¡Correcto!'});
	else
		res.render('quizes/answer', {respuesta : '¡Incorrecto!'});

};