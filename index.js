const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./dataBase/config');
require('dotenv').config();


//crear el servidor de express
const app = express();

//configurar Cors

app.use( cors() );

//lectura y parseo de body

app.use(express.json());

//Base de Datos
dbConnection();

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/login',require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
})
