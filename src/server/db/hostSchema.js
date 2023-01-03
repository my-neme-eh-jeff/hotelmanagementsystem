const mongoose = require("mongoose")


const hostSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique:true
    },username: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true
    },
    initialDate:{
        type:Date,
        required: true
    },
    finalDate:{
        type:Date,
        required:true
    },
    url:[{
        type:String,
        required:true
    }],
    city:{
        type:String,
        required:true
    }

},{ timestamps: true })

const Host = mongoose.model('host', hostSchema)

module.exports = Host
