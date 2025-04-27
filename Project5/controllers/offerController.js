const Offer = require('../models/offer');
const Item = require('../models/item');

exports.makeOffer = async (req, res, next) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) throw new Error('Item not found');
  
      const userId = req.session.user;
  
      if (item.seller.equals(userId)) {
        let err = new Error('Unauthorized: Cannot offer on your own item.');
        err.status = 401;
        return next(err);
      }
  
      const amount = parseFloat(req.body.amount);
      const offer = new Offer({
        amount,
        buyer: userId,
        item: item._id
      });
  
      await offer.save();
  
      item.totalOffers += 1;
      item.highestOffer = Math.max(item.highestOffer, amount);
      await item.save();
  
      req.flash('success', 'Offer submitted!');
      res.redirect(`/items/${item._id}`);
    } catch (err) {
      next(err);
    }
  };

exports.viewOffers = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) throw new Error('Item not found');

        if (!item.seller.equals(req.session.user)) {
            req.flash('error', 'Unauthorized to view offers on this item.');
            return res.redirect('/items/' + item._id);
        }

        const offers = await Offer.find({ item: item._id }).populate('buyer');
        res.render('offer/index', { item, offers });
    } catch (err) {
        next(err);
    }
};

exports.acceptOffer = async (req, res, next) => {
    const userId = req.session.user;
    const itemId = req.params.id;  
    const offerId = req.params.offerId;  

    try {
        const offer = await Offer.findById(offerId).populate('item');
        if (!offer) {
            return res.status(404).render('error', { message: "Offer not found" });
        }

        const item = offer.item;
  
        if (!userId) {
            return res.redirect('/users/login');
        }

        if (item.seller.toString() !== userId.toString()) {
            return res.status(401).render('error', { message: "You are not the seller of this item" });
        }

        item.active = false;  
        await item.save();
  
        offer.status = 'accepted';  
        await offer.save();
  
        await Offer.updateMany(
            { item: item._id, status: 'pending' },
            { status: 'rejected' }
        );
  
        res.redirect(`/items/${item._id}/offers`);
    } catch (err) {
        next(err);  
    }
};


exports.viewOffers = async (req, res, next) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) throw new Error('Item not found');
  
      if (!item.seller.equals(req.session.user)) {
        const err = new Error('Unauthorized to view offers');
        err.status = 401;
        return next(err);
      }
  
      const offers = await Offer.find({ item: item._id }).populate('buyer');
      res.render('offer/offers', { item, offers });
    } catch (err) {
      next(err);
    }
  };
