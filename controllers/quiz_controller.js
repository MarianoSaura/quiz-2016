var models= require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();	
			}else{ next(new Error('No existe quizId= ' + quizId));}	
		}
	).catch(function(error){ next(error);});
};

exports.index = function(req, res){
	models.Quiz.findAll().then(
		function(quizes) {
		res.render('quizes/index', {quizes: quizes});
		}
	).catch(function(error){next(error);})	
};

exports.show = function(req, res){
	var cont=0;
	if(req.query.fallo) cont=req.query.fallo;

		//console.log("Aquíííííííííiííííííí");
		res.render('quizes/show', {
			quiz: req.quiz,
			fallo: cont
		});	
};

	
exports.answer = function(req, res){
	var resultado = ' ';
	var cont=0;
	if(req.query.respuesta === req.quiz.respuesta){
		resultado='Correcto';
	}else{
		resultado='Incorrecto';

		if(req.query.fallo){
			cont=req.query.fallo;
			cont=parseInt(cont);
		} 
		cont=cont+1;	
	}
	res.render('quizes/answer', {
		quiz: req.quiz, 
		respuesta: resultado, 
		fallos: parseInt(cont), 
		errors: []});
};


exports.new = function (req, res) {
	var quiz = models.Quiz.build( 
		{pregunta: "Pregunta", respuesta: "Respuesta"}
		);
	res.render('quizes/new', {quiz: quiz});
};
exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz);

	quiz
	.validate()
	.then(
		function (err) {
			if(err){
				res.render('quizes/new',{quiz: quiz, errors: err.errors});
			} else {
				quiz
				.save({fields: ["pregunta", "respuesta"]})
				.then( function(){ res.redirect('/quizes')})
			}
		}	
	)
};
