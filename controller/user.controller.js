const UserServices = require('../services/user.services.js');
const userServices = new UserServices();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js')
exports.SignUp = async (req, res) => {
    try {
        let addUser = await userServices.checkUser({ firstName: req.body.firstName, isDelete: false });

        if (addUser) {
            res.json({ message: "User Alredy Added..." })
        }

        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(req.body.password, salt);

        addUser = await userServices.newUser({ ...req.body, password: hasPassword });

        res.json({ addUser, message: "New User Add" });

    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
}
exports.Login = async (req, res) => {
    try {
        let User = await userServices.checkUser({ email: req.body.email });

        if (!User) {
            res.json({ message: "user Not Fonud" })
        }

        let matchPassword = await bcrypt.compare(req.body.password, User.password)

        if (!matchPassword) {
            res.json({ message: "Password was Incrrect" })
        }

        let token = jwt.sign({ userId: User._id }, process.env.SECRET_KEY)

        res.json({ User, message: "Login SucessFull", Token: token });

    } catch (error) {
        console.log(error);
        res.json(error.message);
    }


}

exports.userProfile = async (req, res) => {
    try {
        let user = await userServices.userfindById(req.user)

        if (!user) {
            return res.json({ message: "User Not Found" }).status(404);
        }
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
}

exports.changePassword = async (req, res) => {
    try {
        let password = await userServices.checkUser({ password: req.user.password });

        if (!password) {
            res.json({ message: "Password is Not Match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(req.body.password, salt);

        password = await userServices.updateUser(req.user._id, { ...req.body, password: hasPassword })

        return res.json({ message: "Password Is Update" }).status(404);

    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
}

exports.removeUser = async (req, res) => {
    try {
        let checkUser = await userServices.userfindById(req.user);

        if (!checkUser) {
            res.json({ message: "User Not Found" });
        };

        checkUser = await userServices.updateUser(req.user, { isDelete: true });

        res.json({ checkUser, message: "User is Removed...." });
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
}