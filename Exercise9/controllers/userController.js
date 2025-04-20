const model = require('../models/user');
const Story = require('../models/story');

exports.new = (req, res)=>{
        return res.render('./user/new');
};

exports.create = (req, res, next)=>{
    let user = new model(req.body);
    if (user.email) {
        user.email = user.email.toLowerCase();
    }
    user.save()
    .then(user=> {
        req.flash('success', 'Registration succeeded!');
        req.session.save(()=>res.redirect('/users/login'));
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            req.session.save(()=>res.redirect('back'));
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            req.session.save(()=>res.redirect('back'));
        }
        next(err);
    }); 
    
};

exports.getUserLogin = (req, res, next) => {
        return res.render('./user/login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    if (email) {
        email = email.toLowerCase();
    }
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'wrong email address');  
            req.session.save(()=>res.redirect('/users/login'));
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    req.session.save(()=>res.redirect('/users/profile'));
            } else {
                req.flash('error', 'wrong password'); 
                req.session.save(()=>res.redirect('/users/login')); 
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Story.find({author: id})])
    .then(results=>{
        const [user, stories] = results;
        res.render('./user/profile', {user, stories});
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };



