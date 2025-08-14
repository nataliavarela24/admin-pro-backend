const { Schema, model, Collection } = require('mongoose');

const HospitalSchema = Schema({

    nombre:{
        type:String,
        required:true
    },
  
    img:{
        type:String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
  
}, {collection:'hospitales'});
HospitalSchema.method('toJSON',function(){
   const { __v, _id, password, ...object }=this.toObject();

    object.id = _id;

    return object;
})

module.exports = model('Hospital', HospitalSchema);