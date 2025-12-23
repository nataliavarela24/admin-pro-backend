
const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    console.log("LOGIN - Body recibido:", req.body);

    try {

        const usuarioDB = await Usuario.findOne({ email });


        console.log("LOGIN - Usuario encontrado:", usuarioDB);

        if (!usuarioDB) {
            console.log("LOGIN - Email no válido");
            return res.status(404).json({
                ok: false,
                msg: 'Email no válida'
            });
        }

        const validPasword = bcrypt.compareSync(password, usuarioDB.password);

        console.log("LOGIN - Password válido:", validPasword);

        if (!validPasword) {
            console.log("LOGIN - Contraseña incorrecta");
            return res.status(400).json({
                ok: false,
                msg: 'Constraseña no valida'
            })
        }

        const token = await generarJWT(usuarioDB.id);

        console.log("LOGIN - Token generado:", token);

        res.json({
            ok: true,
            token: token,
            usuario: usuarioDB
        });

    } catch (error) {
        console.log("LOGIN - ERROR:", error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const googleSingIn = async (req, res = response) => {

    console.log("GOOGLE - Token recibido:", req.body.token);

    try {

        const { email, name, picture } = await googleVerify(req.body.token);

        console.log("GOOGLE - Datos verificados:", { email, name, picture });

        const usuarioDB = await Usuario.findOne({ email });

        console.log("GOOGLE - Usuario encontrado:", usuarioDB);

        let usuario;

        if (!usuarioDB) {
            console.log("GOOGLE - Creando nuevo usuario");
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            console.log("GOOGLE - Usuario ya existe, actualizando flag google");
            usuario = usuarioDB;
             usuario.img = picture;
            usuario.google = true;
        }

        await usuario.save();

        console.log("GOOGLE - Usuario guardado/actualizado:", usuario);

        const token = await generarJWT(usuario.id);

        console.log("GOOGLE - Token generado:", token);

        res.json({
            ok: true,
            token,
            usuario
        });

    } catch (error) {
        console.log("GOOGLE - ERROR:", error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });

    }

}


const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar el token -JWT
    const token = await generarJWT(uid);

    //Obtener el usuario por UID

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario
    });


}
module.exports = {
    login,
    googleSingIn,
    renewToken
}