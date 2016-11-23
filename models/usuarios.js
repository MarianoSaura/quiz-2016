module.exports = function(sequelize, DataTypes){
	return sequelize.define('Usuarios',
	{
		username: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "--> Falta el nombre"}}
		},
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty: {msg: "--> Falta la contraseña"}}
		}
	}
	);
}
