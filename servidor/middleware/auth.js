const jwt = require('jsonwebtoken');


module.exports = function(req, res, next){
    //Leer eñ token del header
    const token = req.header('x-auth-token');

    console.log(token);


    //Revisar si no hay token 
    if(!token){
        return res.status(401).json({msg: 'No hay Token, permiso no válido'});
    }


    //Validar el token
}