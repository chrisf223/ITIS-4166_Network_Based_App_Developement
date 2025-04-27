const model = require('../models/user');
const Item = require('../models/item');
const Offer = require('../models/offer');

exports.new = (req, res)=>{
    return res.render('./user/new');
};

exports.create = (req, res, next)=>{
    let user = new model(req.body);
    user.save()
    .then(user => {
        req.flash('success', 'Account created successfully. Please log in.');
        res.redirect('/users/login');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/new');
        }

        if (err.message && err.message.toLowerCase().includes('email')) {
            req.flash('error', 'This email address has already been used.');
            return res.redirect('/users/new');
        }    
        next(err);
    }); 
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./user/login');
    
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
                } else {
                    req.flash('error', 'wrong password');      
                    res.redirect('/users/login');
                }
                });     
            }     
        })
    .catch(err => next(err));
    
    
};

exports.profile = async (req, res, next) => {
    try {
      const id = req.session.user;
  
      const [user, items, offersMade] = await Promise.all([
        model.findById(id),
        Item.find({ seller: id }),
        Offer.find({ buyer: id }).populate('item')
      ]);
  
      res.render('./user/profile', { user, items, offersMade });
    } catch (err) {
      next(err);
    }
  };


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };