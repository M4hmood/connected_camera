require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).send({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Invalid token' });
    }
};

/* // or store jwt in cookies
const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.MY_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};
*/