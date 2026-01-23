require('dotenv').config();
const { dbConnection } = require('../database/config');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/usuario');

const crearUsuario = async () => {
    try {
        // Conectamos a la BD usando tu función
        await dbConnection();


        // Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync('123456', salt);

        // Creamos el nuevo usuario
        const usuario = new Usuario({
            nombre: 'Natalia Varela',
            email: 'natalianicole.varela@gmail.com',
            password: passwordHash,
            role: 'ADMIN_ROLE',
            google: false
        });

        await usuario.save();

        process.exit(); // Termina la ejecución
    } catch (err) {
        console.error('❌ Error al crear el usuario:', err);
        process.exit(1);
    }
};

crearUsuario();
