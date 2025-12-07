const jwt = require('jsonwebtoken');
const User = require('../Modals/user');
require("dotenv").config();

const auth = async (req, res, next) => {

    const token = req.cookies.token;
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    } else {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
}

module.exports = auth;