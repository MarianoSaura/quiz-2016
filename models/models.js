var path = require('path');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(null, null, null,
	{dialect: "sqlite", storage: "quiz.sqlite"}
);

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;

sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count === 0){
			Quiz.create({ pregunta: 'Capital de Italia',
						respuesta: 'Roma'
			})
			Quiz.create({ pregunta: 'Capital de Portugal',
						respuesta: 'Lisboa'
			})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});

var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

var comment_path = path.join(__dirname, 'comment');
var Comment= sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;
