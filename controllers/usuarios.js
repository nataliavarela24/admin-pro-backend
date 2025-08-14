
const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')


const getUsuarios = async (req, res) => {
     const desde = Number(req.query.desde|| 0);
        console.log(desde);
    /* const usuarios = await Usuario
                                  .find({},'nombre email role google')
                                  .skip( desde )
                                  .limit( 5 );

    const total = await Usuario.countDocuments(); */

    const [ usuarios,total ] = await Promise.all([
        Usuario
            .find({},'nombre email role google img')
            .skip( desde )
            .limit( 5 ),


        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total

    });
}

const crearUsuarios = async (req, res = response) => {

    const { email, password, nombre } = req.body;


    try {

        const existeEmail = await Usuario.findOne({ email: 'fernando@gmail.com' })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const token = await generarJWT(usuario.id)

        //Guardar usuarios
        await usuario.save();

        res.json({
            ok: true,
            usuario,
            token

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar log'
        });
    }


}
const actualizarUsuario = async (req, res = response) => {
    //Todo:Validar token y comprobar si es el usuario correcto
    console.log(req)
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }

        //Actualizaciones 
        const { password, google, email, ...campos} = req.body;

        if (usuarioDB.email !== email) {
       
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }

        }

       campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos,{ new:true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados'
        })
    }

}
const borrarUsuarios = async(req, res = response)=>{
    console.log(req)
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con ese id'
            });
        }
        const borrarUsuarios = Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            usuario: borrarUsuarios
        });

    } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperados'
            })
        }
    }



module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuarios
}