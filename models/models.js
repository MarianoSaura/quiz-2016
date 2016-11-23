var path = require('path');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(null, null, null,
	{dialect: "sqlite", storage: "quiz.sqlite"}
);

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

var comment_path = path.join(__dirname, 'comment');
var Comment= sequelize.import(comment_path);

//	conexion con usuarios
var usuario_path = path.join(__dirname,'usuarios');
var Usuarios = sequelize.import(usuario_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

sequelize.sync().then(function(){
	//Quiz.find().then(function(quizzes){quizzes.forEach(function(quiz){console.log(quiz);})});
	Quiz.count().then(function(count){
		if(count === 0){
			Quiz.create({ pregunta: 'Capital de Italia',
						respuesta: 'Roma'
			})
			Quiz.create({ pregunta: 'Capital de Portugal',
						respuesta: 'Lisboa'
			})
			.then(function(){console.log('Base de datos inicializada con Quiz')});
		};
	});
	Usuarios.count().then(function(count){
		if(count === 0){
			Usuarios.create({ username: 'admin',
						password: '1234'
			})
			Usuarios.create({ username: 'pepe',
						password: '5678'
			})
			.then(function(){console.log('Base de datos inicializada con Usuarios')});
		};
	});
});

exports.Quiz = Quiz;
exports.Comment = Comment;
exports.Usuarios = Usuarios;
