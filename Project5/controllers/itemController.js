const model = require('../models/item');
const Offer = require('../models/offer');

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
            items.sort((a, b) => a.price - b.price);
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
    itemData.offers = 0;;
    itemData.seller = req.session.user;
    let item = new model(itemData);

    item.save()
        .then(() => {
            req.flash('success','Item Created Successfully');
            res.redirect('/items'); 
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400; 
            }
            next(err); 
        });
};

exports.show = (req, res, next)=> {
    let id = req.params.id;

    model.findById(id).populate('seller')
    .then(item=>{        
        return res.render('./item/show', {item});
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=> {
    let id = req.params.id;
    
    model.findById(id)
    .then(item=>{
        return res.render('./item/edit', {item});   
        })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=> {
    let id = req.params.id;
    let item = req.body;
    let file = req.file;
    if (file) item.image = file.filename;
    
    model.findByIdAndUpdate(id, item, { new: true, runValidators: true })
    .then(item=>{
        req.flash('success','Item Edited Successfully');
        res.redirect('/items/'+id);    
    })
    .catch(err=>{
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    Offer.deleteMany({ item: id })
        .then(() => {
            return model.findByIdAndDelete(id, { useFindAndModify: false });
        })
        .then(() => {
            req.flash('success', 'Item and associated offers deleted successfully');
            res.redirect('/items');
        })
        .catch(err => {
            next(err); 
        });
};


