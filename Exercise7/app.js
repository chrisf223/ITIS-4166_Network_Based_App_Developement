// Require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const storyRoutes = require('./routes/storyRoutes');
const userRoutes = require('./routes/userRoutes');

// Create app
const app = express();

// Configure app
const port = 3000;
const host = 'localhost';
app.set('view engine', 'ejs');

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/demos')
.then(() => {
    app.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}`);
    });
})
.catch(err => console.log('DB connection error:', err.message));

// Mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Session configuration (simple for practice)
app.use(session({
    secret: 'practice-secret-key-123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60*60*1000 } // 1 hour
}));

// Flash messages
app.use(flash());

// Make user and messages available to all templates
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Story routes
app.use('/stories', storyRoutes);

// User routes
app.use('/users', userRoutes);

// Error handlers
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.render('error', { 
        error: {
            status: err.status || 500,
            message: err.status === 404 ? 'Page Not Found' : 'Something went wrong'
        }
    });
});
