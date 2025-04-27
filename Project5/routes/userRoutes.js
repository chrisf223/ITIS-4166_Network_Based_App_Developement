const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middlewares/auth');
const { validateUser } = require('../middlewares/modelValidation');

const router = express.Router();

router.get('/new', isGuest, controller.new);

router.post('/', isGuest, validateUser, controller.create);

router.get('/login', isGuest, controller.getUserLogin);

router.post('/login', isGuest, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
