var models= require('../models/models.js');

exports.new = function(req, res){
	res.render('sign/new');
};

exports.create = function (req, res) {
	if (req.body.password === req.body.password2) {

		var usuario = models.Usuarios.build(
				{username: req.body.login,
				password: req.body.password
			})

		usuario
		.validate()
		.then(
			function(err){
				if(err){
					res.render('sign/new.ejs',
						{errors: err.errors});
				}else{
					usuario
					.save()
					.then(function () { res.redirect('/user')})
				}
			
			}
		).catch(function(error){next(error)});
	}else{
		callback(new Error("No coincide la contraseña"));
	}
};

exports.index = function(req, res){
	models.Usuarios.findAll().then(
		function(usuarios) {
		res.render('sign/index', {usuarios: usuarios, errors: []});
		}
	).catch(function(error){next(error);})	
};
