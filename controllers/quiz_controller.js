/**
* Quiz Controller  
*/
var models = require('../models/models.js');

// Autoload - Factoriza el código si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId)
        .then(function (quiz) {
            if(quiz){
                req.quiz = quiz;
                next();
            } else {
                next( new Error('No existe el Quiz Id: '+quizId));
            }
        })
        .catch(function (e) {
            next(e);
        });
};

// GET /index
exports.index = function (req, res){
    models.Quiz.findAll()
        .then(function (quizes){
            res.render('quizes/index.ejs',{quizes : quizes});
        })
        .catch(function(e){
            next(e);
        });
};

// GET /quizes/:id
exports.show = function (req, res) {
    res.render('quizes/show', {quiz : req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
    var resultado = '¡Incorrecto!';
    if(req.query.respuesta === req.quiz.respuesta)
        resultado = '¡Correcto!';
    res.render('quizes/answer', {quiz: req.quiz, respuesta : resultado});
};

