const model = require('../models/story');
exports.index = (req, res, next)=>{
    //res.send('send all stories');
    model.find()
    .then(stories=>res.render('./story/index', {stories}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./story/new');
};

exports.create = (req, res, next)=>{
    //res.send('Created a new story');
    let story = new model(req.body); //create a new story document
    story.save() //insert the document into the database  
    .then((story)=> res.redirect('/stories'))
    .catch(err=>{
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    //an objectID is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(story=>{
        if(story) {
            return res.render('./story/show', {story});
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));   
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(story=>{
        if(story) {
            return res.render('./story/edit', {story});
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));   
};

exports.update = (req, res, next)=>{
    let story = req.body;
    let id = req.params.id;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, story, {useAndModify: false, runValidators: true})
    .then(story=>{
        if (story) {
            res.redirect('/stories/'+id);
        }
        else {
            let err = new Error('Cannot find a story with id ' + id);
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

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useAndModify: false})
    .then(story=> {
        if (story) {
            res.redirect('/stories');
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};