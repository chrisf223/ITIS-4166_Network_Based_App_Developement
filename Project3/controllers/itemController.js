const model = require('../models/item');
const { upload } = require('../public/javascript/fileUpload');


exports.index = (req, res, next)=> {
    model.find()
    .then(items=>{
        let searchTerm = req.query.search;
        let foundItems = true;
        if (searchTerm) {
            items = items.filter(item => 
                item.active && (
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    item.details.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        
        if (items.length === 0) {
            foundItems = false;  
        }
        else {
            foundItems = true;
            items.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        }

        res.render('./item/index', {items,foundItems});
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
    if (file) itemData.image = file.filename;
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
    .then(item=>{
        if(item) {
            return res.render('./item/show', {item});
        } else {
            let err = new Error('Cannot find an item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=> {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(item=>{
        if(item) {
            res.render('./item/edit', {item});
        }
        else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=> {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }

    let item = req.body;
    let file = req.file;
    if (file) item.image = file.filename;

    
    
    model.findByIdAndUpdate(id, item, { new: true, runValidators: true })
    .then(item=>{
        if (item) {
            res.redirect('/items/'+id);
        }
        else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next)=> {
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid item id');
        err.status = 400;
        return next(err);
    }
    
    model.findByIdAndDelete(id, {useAndModify: false})
    .then(item=> {
        if (item) {
            res.redirect('/items');
        } 
        else {
            let err = new Error('Cannot find a item with id ' + id);
            err.status = 404;
            next(err);
        }
         
    })
    .catch(err=>next(err));
};


