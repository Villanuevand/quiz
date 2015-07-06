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
exports.index = function (req, res, next){
    var search = ("%" + (req.query.search || "") + "%").replace(' ', '%');
    models.Quiz.findAll({
        where : ['pregunta like ?', search]
    })
    .then(function (quizes){
        res.render('quizes/index.ejs',{
            quizes : (req.query.search) ? quizes.sort(function (a, b){
                return a.pregunta > b.pregunta;
            }) : quizes
        });
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

