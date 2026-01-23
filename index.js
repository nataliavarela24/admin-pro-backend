const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./dataBase/config');
require('dotenv').config();

path = require('path');


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
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/uploads',require('./routes/uploads'));

app.get('*',(req,res) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html') );
});
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
})
