const mongoose = require('mongoose');

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Base de datos online')
    } catch(error){
        console.log(error)
        throw new Error('Error al levantar la BD')
    }
}

module.exports = {
    dbConnection
}