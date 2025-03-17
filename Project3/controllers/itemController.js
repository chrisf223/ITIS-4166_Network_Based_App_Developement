const model = require('../models/item');
const { upload } = require('../public/javascript/fileUpload');


exports.index = (req, res, next)=> {
    model.find()
    .then(items=>{
        let searchTerm = req.query.search;
        
        if (searchTerm) {
            items = items.filter(item => 
                item.active && (
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    item.details.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        
        items.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        res.render('./item/index', {items});
    })    
    .catch(err=>{
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

exports.new = (req, res)=>{
    res.render('./item/new');
};

exports.create = (req, res, next) => {
    let itemData = req.body;
    let file = req.file;
    itemData.image = file.filename;
    itemData.active = true;
    itemData.offers = Math.floor(Math.random() * 6);
    let item = new model(itemData);

    item.save()
        .then(() => res.redirect('/items')) 
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400; 
            }
            next(err); 
        });
};

exports.show = (req, res, next)=> {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(story=>{
        if(story) {
            return res.render('./item/show', {story});
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

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


