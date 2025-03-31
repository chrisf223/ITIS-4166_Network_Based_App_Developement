const express = require('express');
const controller = require('../controllers/userController');

const isLoggedIn = (req, res, next) => {
    if (req.session.user) return next();
    req.flash('error', 'Please login first');
    res.redirect('/users/login');
};

const isNotLoggedIn = (req, res, next) => {
    if (!req.session.user) return next();
    res.redirect('/users/profile');
};

const router = express.Router();

router.get('/new', isNotLoggedIn, controller.new);
router.post('/', isNotLoggedIn, controller.create);
router.get('/login', isNotLoggedIn, controller.login);
router.post('/login', isNotLoggedIn, controller.authenticate);
router.get('/profile', isLoggedIn, controller.profile);
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
