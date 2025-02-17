const model = require('../models/story');

exports.index = ('/', (req, res)=> {
    let stories = model.find();
    res.render('./story/index', {stories});
});

exports.new = ('/new', (req, res)=>{
    res.render('./story/new');
});

exports.create = ('/', (req, res)=> {
    let story = req.body;
    model.save(story);
    res.redirect('/stories');
});


exports.show = ('/:id', (req, res, next)=> {
    let id = req.params.id;
    let story = model.findById(id);
    if (story) {
        res.render('./story/show', {story});
    }
    else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
    }
});

exports.edit = ('/:id/edit', (req, res)=> {
    let id = req.params.id;
    let story = model.findById(id);
    if (story) {
        res.render('./story/edit', {story});
    }
    else {
        res.status(404).send('Cannot find story with id ' + id);
    }
});

exports.update = ('/:id', (req, res)=> {
    let story = req.body;
    let id = req.params.id;
    if (model.updateById(id, story)) {
        res.redirect('/stories/'+id);
    }
    else {
        res.status(404).send('Cannot find story with id ' + id);
    }
});

exports.delete = ('/:id', (req, res)=> {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/stories/');
    }
    else {
        res.status(404).send('Cannot find story with id ' + id);
    }
});