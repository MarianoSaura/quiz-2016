var models= require('../models/models.js');

exports.load = function(req, res, next, usuariosId){
	models.Usuarios.findOne({
		 where: {id: Number(usuariosId)},
		}).then(
		function(user){
			if(user){
				req.user = user;
				next();	
			}else{ next(new Error('No existe usuariosId= ' + usuariosId));}	
		}
	).catch(function(error){ next(error);});
};

/*var users = { admin: {id: 1, username:"admin", password:"1234"},
			pepe: {id:2, username:"pepe", password:"5678"}
			};*/

exports.autenticar = function(login, password, callback){
	//console.log("------------------> "+ login);

	models.Usuarios.findOne({
		where: {username: login, password: password}
	}).then(
		function(user){
			if(user){
				callback(null, user);
			}else{
				callback(new Error("Usuario o contraseña incorrectos"));
			}	
		}
	).catch(function(error){ 
		callback(new Error("No existe el usuario"));
	});

	/*if(users[login]){
		if(password === users[login].password){
			callback(null, users[login]);
		}
		else{callback(new Error('password erróneo.')); }
	}else{ callback(new Error('No existe el usuario.')); }*/
};
