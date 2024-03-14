const User = require('../models/user.models.js');

module.exports = class UserServices {

    async checkUser(body){
        try {
            return await User.findOne(body)
        } catch (error) {
            console.log(error);
            return error
        }
    };
    async allUsers(){
        try {
            return await User.find()
        } catch (error) {
            console.log(error);
            return error
        }
    };

    async newUser(body){
        try {
            return await User.create(body)
        } catch (error) {
            console.log(error);
            return error
        }
    };

    async userfindById(id){
        try {
            return await User.findById(id)
        } catch (error) {
            console.log(error);
            return error
        }
    };

    async updateUser(id,body){
        try {
            return await User.findByIdAndUpdate(id,body,{new:true})
        } catch (error) {
            console.log(error);
            return error
        }
    };
}