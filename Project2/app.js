const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/items', itemRoutes);


app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
    
 });

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("internal server error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});

app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
});