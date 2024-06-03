const router = require('express').Router();
const user = require('../../controllers/userController');
const verifyToken = require('../../middlewares/authMiddleware');

router.route('/')
    .post(user.createUser)
    .get(user.getUsers);

router.route('/:id')
    .get(user.getUserById)
    .patch(user.updateUser)
    .delete(user.deleteUser);

module.exports = router;
