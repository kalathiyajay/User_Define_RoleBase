const jwt = require("jsonwebtoken");
const UserServices = require('../services/user.services.js')
const userServices = new UserServices();

exports.veryfyToken = async (req, res, next) => {
    let authorization = req.headers["authorization"];
    if (typeof authorization !== undefined) {
        let token = authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await userServices.userfindById(userId);
        if (!req.user) {
            return res.json({ message: "Invailed Token" })
        }
        else {
            next();
        }
    }
    else {
        return res.json({ message: "Not Authorize person" });
    }
}
