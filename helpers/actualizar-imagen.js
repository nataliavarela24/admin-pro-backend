const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

borrarImagen =(path )=>{
    
            if(fs.existsSync( path)){
                //borrar la imagen anterior
                fs.unlinkSync(path);
            }

}

const actualizarImagen = async(tipo, id, nombreArchivo) =>{


    switch(tipo){
         case 'medicos':
            const medico = await Medico.findById(id);
            if( !medico ){
                console.log('No es un médico por id')
                return false;
            }

            const pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img= nombreArchivo;
            await medico.save();
            return true;
         break;
         case 'hospitales':
             const hospital = await Hospital.findById(id);
            if( !hospital ){
                console.log('No es un médico por id')
                return false;
            }

            const pathViejo2 = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo2);
            hospital.img= nombreArchivo;
            await hospital.save();
            return true;
         break;
         case 'usuarios':
             const usuario = await Usuario.findById(id);
            if( !usuario ){
                console.log('No es un médico por id')
                return false;
            }

            const pathViejo3 = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo3);
            usuario.img= nombreArchivo;
            await usuario.save();
            return true;
         break;
    }

    

}

module.exports = {
    actualizarImagen
}