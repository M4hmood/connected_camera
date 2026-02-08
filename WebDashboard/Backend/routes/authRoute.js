const router = require('express').Router();
const { signup } = require('../controllers/signupController');
const { login } = require('../controllers/loginController');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;