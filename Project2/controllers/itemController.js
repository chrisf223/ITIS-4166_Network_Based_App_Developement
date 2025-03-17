const model = require('../models/item');
const { upload } = require('../public/javascript/fileUpload');


exports.index = ('/', (req, res)=> {
    let items = model.find();
    let searchTerm = req.query.search;
    console.log(searchTerm);
    
    if (searchTerm) {
        items = items.filter(item => item.active && item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    items.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));

    res.render('./item/index', {items});
});

exports.new = ('/new', (req, res)=>{
    res.render('./item/new');
});

exports.create = ('/', upload, (req, res)=> {
    let item = req.body;
    let file = req.file;
    model.save(item, file);
    res.redirect('/items');
});

exports.show = ('/:id', (req, res, next)=> {
    let id = req.params.id;
    let item = model.findById(id);
    if (item) {
        res.render('./item/show', {item});
    }
    else {
        let err = new Error('Cannot find a item with id ' + id);
        err.status = 404;
        next(err);
    }
});

exports.edit = ('/:id/edit', (req, res)=> {
    let id = req.params.id;
    let item = model.findById(id);
    if (item) {
        res.render('./item/edit', {item});
    }
    else {
        let err = new Error('Cannot find a item with id ' + id);
        err.status = 404;
        next(err);
    }
});

exports.update = ('/:id', upload, (req, res)=> {
    let item = req.body;
    let id = req.params.id;
    let file = req.file;
    if (model.updateById(id, item, file )) {
        res.redirect('/items/'+id);
    }
    else {
        let err = new Error('Cannot find a item with id ' + id);
        err.status = 404;
        next(err);
    }
});

exports.delete = ('/:id', (req, res)=> {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/items/');
    }
    else {
        let err = new Error('Cannot find a item with id ' + id);
        err.status = 404;
        next(err);
    }
});


