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
		var err = new Error('Las contraseñas no son iguales');

		res.render('sign/new', {errors: [err]});

	}
};

exports.index = function(req, res){
	models.Usuarios.findAll().then(
		function(usuarios) {
		res.render('sign/index', {usuarios: usuarios, errors: []});
		}
	).catch(function(error){next(error);})	
};
