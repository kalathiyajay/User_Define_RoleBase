const mongoose = require('mongoose');

const UserSchemas = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please enter a valid Email Address']
    },
    password:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        max:[10],
        required:[true,'Please enter a valid Mobile No']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    isDelete:{
        type:Boolean,
        default:false
    }
});

module.exports =  mongoose.model('User', UserSchemas);