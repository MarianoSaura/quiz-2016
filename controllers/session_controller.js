var models= require('../models/models.js');

exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/login');
	}
}
exports.adminRequired = function(req, res, next){
	//console.log("----------------------> "+req.session.user.username);
	if("admin"===req.session.user.username){
		next();
	}else if(req.user.id===req.session.user.id){
		next();
	}else{
		res.redirect('/login');
	}
}

exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

exports.create = function (req, res) {
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{"message": 'se ha producido un error: '+error}];
			res.redirect('/login');
		}
		req.session.user = {id:user.id, username:user.username, aciertos: user.aciertos};
		
		res.redirect(req.session.redir.toString());
	});
};

exports.edit = function (req, res) {

	var usuarios = req.user;
	res.render('sign/edit', {usuarios: usuarios, errors: []});
};
exports.update = function (req, res) {
	if("admin"===req.session.user.username){
		req.user.username = req.body.usuarios.username;
	}
	req.user.password = req.body.usuarios.password;

	req.user
	.validate()
	.then(
		function (err) {
			if(err){
				res.render('user/edit', {user: req.user, errors:err.errors});
			}else{
				req.user
				.save( {fields: ["username", "password"]})
				.then( function () {res.redirect('/user');});
			}
		}
	);
};

exports.destroy =function(req, res){
	delete req.session.user;

	res.redirect(req.session.redir.toString());
}

exports.delete = function(req, res){
	if("admin"===req.session.user.username){
		req.user.destroy().then( function() {
			res.redirect('/user');
		}).catch(function (error) {next(error)});
	}
};