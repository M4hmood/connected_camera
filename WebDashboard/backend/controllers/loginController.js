const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const joi = require("joi");


exports.login = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message});
        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return res.status(401).send({ message: "Invalid Username or Password"});
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch)
            return res.status(401).send({ message: "Invalid Username or Password"});
        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: "Logged in successfuly !"});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error has occured when logging in' });
    }
};

const validate = data => {
    const schema = joi.object({
        username: joi.string().alphanum().min(5).max(15).required().label("Username"),
        password: joi.string().required().label("Password")
    })
    return schema.validate(data);
};