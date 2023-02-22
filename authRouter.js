const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require("express-validator");
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post('/reg', [
    check('username', 'Username cannot be empty!').notEmpty(),
    check('password', 'Password cannot be less than 10 symbols!').isLength({min: 10, max: 100})
], controller.reg);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['USER']), controller.getUsers);

module.exports = router;