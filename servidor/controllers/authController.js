const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUser = async (req, res) => {
  //Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //Extraer email y password
  const { email, password } = req.body;

  try {
    //Revisar que sea un usuario registrado
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({msg: "El usuario no existe"});
    }

     //Revisamos su password
     const passCorrecto = await bcryptjs.compare(password, user.password);
     if(!passCorrecto){
        return res.status(400).json({msg: "Password incorrecto"});
     }

      // Si todo es correcto Crear y firmar el JWT
      const payload = {
        user: {
            id: user.id
        }
    };

     //Firmar el jwt
    jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: 3600, //Una hora
        },
        (error, token) => {
          if (error) throw error;
  
          //Mensaje de confirmación
          res.json({ token });
        }
      );

  } catch (error) {
      console.log(error);
  }
};
