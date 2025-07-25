
const { response } = require('express');
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response )=>{

    const { email, password } = req.body

    try {

        const usuarioDB = await  Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg:'Email no válida'
            });
        }
        const validPasword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPasword ){
            return res.status(400).json({
                ok:false,
                msg: 'Constraseña no valida'
            })
        }

        //Generar el Token - JWTtoken 


        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            token: token
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }

}
module.exports ={
    login
}