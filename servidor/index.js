const express = require('express');
const conectarDB = require('./config/db')

//Creamos el servidor
const app = express();

//Conectamos a la BD
conectarDB();

//Habilitar Express.json
app.use(express.json({expended:true}));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

//Definimos la página principal, para ver si esta funcionando correctamente
// app.get('/', (req, res) =>{
//     res.send('Hola world')
// })


//Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})

