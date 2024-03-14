const express = require('express');
const userRoutes = express.Router();
const { SignUp, Login, userProfile, changePassword, removeUser } = require('../controller/user.controller.js');
let { veryfyToken } = require('../helper/tokenGenreter.js');

const isAdmin = async (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    }
    else {
        res.json("Only is admin users allowed")
        console.log('You are not allowed');
    }
};
userRoutes.post('/add-user',SignUp);
userRoutes.post('/login',Login);
userRoutes.get('/me', veryfyToken, userProfile);
userRoutes.put('/change-password', veryfyToken, changePassword);
userRoutes.delete('/remove-user', veryfyToken, removeUser);


module.exports = userRoutes;