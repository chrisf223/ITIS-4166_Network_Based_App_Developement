const model = require('../models/story');


exports.index = (req, res, next)=>{
    model.find()
    .then(stories=>res.render('./story/index', {stories}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./story/new');
};

exports.create = (req, res, next)=>{
    let story = new model(req.body);
    story.author = req.session.user;
    story.save()
    .then(story=> {
        req.flash('success', 'Story has been created successfully');
        req.session.save(()=>res.redirect('/stories'));
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        req.session.save(()=>res.redirect('back'));
        }
        next(err);
    });
    
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
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
    model.findById(id)
    .then(story=>{
        return res.render('./story/edit', {story});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let story = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, story, {useFindAndModify: false, runValidators: true})
    .then(story=>{
        return res.redirect('/stories/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            req.session.save(()=>res.redirect('back'));
        }
        next(err);
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(story =>{
        res.redirect('/stories');
    })
    .catch(err=>next(err));
};