const { response } = require('express');

const Medico = require('../models/medico')

const getMedicos = async (req, res = response ) => {
    
        const medicos = await Medico.find()
                                        .populate('usuario','nombre img')
                                        .populate('hospital','nombre')
    res.json({
        ok:true,
        medicos
    })
}
const crearMedico = async (req, res=response ) => {
    const uid = req.uid;
     const medico = new Medico({
             usuario:uid,
            ...req.body
        });

     try {

        const medicoDB = await medico.save()

        res.json({
        ok:true,
        medico:medicoDB
    })

    } catch (error){
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
}
const actualizarMedicos = (req, res ) => {
    res.json({
        ok:true,
        msg:'actualizarMedico'
    })
}
const borrarMedico = (req, res ) => {
    res.json({
        ok:true,
        msg:'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedicos,
    borrarMedico
}