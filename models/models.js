var path = require('path');

//Cargar model ORM.
var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, null,{
	dialect : 'sqlite', storage : 'quiz.sqlite'
});
//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
exports.Quiz = Quiz; // Exportar definición de la tabla quiz.

//sequelize.sync() crea e inicializa la tabla de preguntas en DB.
sequelize.sync().then(function (){
	Quiz.count().then(function (count){
		if(count === 0){
			Quiz.create({
				pregunta : 'Capital de Italia',
				respuesta : 'Roma'
			}).then(function (){
				console.log('DB inicializada!');
			})
		}
	});
});