const User = require('../models/user');

// Display registration form
exports.new = (req, res) => {
    res.render('./user/new', { 
        user: null,
        errors: req.flash('error'),
        success: req.flash('success') 
    });
};

// Create new user
exports.create = async (req, res, next) => {
    try {
        // Basic input validation
        if (!req.body.email || !req.body.password) {
            req.flash('error', 'Email and password are required');
            return res.redirect('/users/new');
        }

        if (req.body.password !== req.body.confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('/users/new');
        }

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();
        
        req.session.user = user._id;
        req.flash('success', 'Account created successfully!');
        res.redirect('/users/profile');
    } catch (err) {
        if (err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if (err.code === 11000) {
            req.flash('error', 'Email already exists');
            return res.redirect('/users/new');
        }
        next(err);
    }
};

// Display login form
exports.login = (req, res) => {
    res.render('./user/login', { 
        errors: req.flash('error'),
        success: req.flash('success') 
    });
};

// Authenticate user
exports.authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            req.flash('error', 'Email and password are required');
            return res.redirect('/users/login');
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/users/login');
        }

        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
            req.flash('error', 'Invalid email or password');
            return res.redirect('/users/login');
        }

        req.session.user = user._id;
        req.flash('success', 'You have successfully logged in');
        res.redirect('/users/profile');
    } catch (err) {
        next(err);
    }
};

// Display user profile
exports.profile = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.user);
        
        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/users/login');
        }

        res.render('./user/profile', { 
            user,
            success: req.flash('success') 
        });
    } catch (err) {
        next(err);
    }
};

// Logout user
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};