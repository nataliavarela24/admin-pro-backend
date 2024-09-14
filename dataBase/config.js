const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN,{
        userNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true

    });
    console.log('DB Online');
} catch (error){
    console.log(error);
    throw new Error('ErroR a la hora de iniciar la BD ver logs')
}
}
module.exports={
    dbConnection
}