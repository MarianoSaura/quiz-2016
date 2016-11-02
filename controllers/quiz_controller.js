var models= require('../models/models.js');

exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
	
};

exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			quiz[0].cont=quiz[0].cont+1;
			quiz[0].save().then(function(){
				res.render('quizes/answer', {respuesta: 'Correcto'});
			})
		}else{
			//res.render('quizes/answer', {respuesta: 'Incorrecto'});
			res.render('errorPagina.ejs', {acierto: quiz[0].cont});
		}
	});
};
