const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./dataBase/config');


//crear el servidor de express
const app = express();

//configurar Cors

app.use(cors);
//Base de Datos
dbConnection();

console.log(process.env);

// Rutas
app.get('/',(req, res) => {
    res.json({
        ok:true,
        msg:'Hola Mundo',

    })

});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
})
