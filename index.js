const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./dataBase/config');
require('dotenv').config();


//crear el servidor de express
const app = express();

//configurar Cors

app.use( cors() );

// Carpeta pública

app.use(express.static('public'));

//lectura y parseo de body

app.use(express.json());

//Base de Datos
dbConnection();

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/busquedas',require('./routes/busquedas'));
app.use('/api/uploads',require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
})
