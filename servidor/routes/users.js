//Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {check} = require('express-validator');


//Crea un usuario
//api/usuarios
router.post('/', 
[
    check('nombre', 'El nombre es obliagatorio').not().isEmpty(),
    check('email','Agrega un email válido').isEmail(),
    check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min: 6})
],
    userController.createUser
);

module.exports = router;
