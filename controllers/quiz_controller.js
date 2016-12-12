var models= require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.findOne({
		 where: {id: Number(quizId)},
		 include: [{model: models.Comment }]
		}).then(
		function(quiz){
			if(quiz){ console.log(quiz);
				req.quiz = quiz;
				next();	
			}else{ next(new Error('No existe quizId= ' + quizId));}	
		}
	).catch(function(error){ next(error);});
};

exports.index = function(req, res){
	models.Quiz.findAll().then(
		function(quizes) {
		res.render('quizes/index', {quizes: quizes, errors: []});
		}
	).catch(function(error){next(error);})	
};


exports.show = function(req, res){
		res.render('quizes/show', {quiz: req.quiz});	
};

exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado='Correcto';
		if(req.session.user){
			console.log("------------>"+req.session.user.aciertos);
					
			if(isNaN(parseInt(req.session.user.aciertos))){
				req.session.user.aciertos=1;
				console.log("------------>"+req.session.user.aciertos);
			}else{
				req.session.user.aciertos=parseInt(req.session.user.aciertos)+1;
				console.log("------------>"+req.session.user.aciertos);
			}

			models.Usuarios.findOne({
			 where: {id: Number(req.session.user.id)}
			}).then(
				function(usuario){
					if(usuario){
						usuario.aciertos=req.session.user.aciertos;
						usuario.save({fields: ["aciertos"]})
						
					}else{
						res.render('/login',
						{errors: new Error('No está correctamente autenticado')});
					}
				
				}
			).catch(function(error){next(error)});
		}
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
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
exports.edit = function (req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function (req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	req.quiz
	.validate()
	.then(
		function (err) {
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors:err.errors});
			}else{
				req.quiz
				.save( {fields: ["pregunta", "respuesta"]})
				.then( function () {res.redirect('/quizes');});
			}
		}
	);
};
exports.destroy = function(req, res){
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch(function (error) {next(error)});
};
