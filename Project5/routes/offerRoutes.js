const express = require('express');
const router = express.Router({ mergeParams: true });
const controller = require('../controllers/offerController');
const { isLoggedIn } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');
const { validateOffer } = require('../middlewares/modelValidation');

router.post('/', isLoggedIn, validateOffer, controller.makeOffer);

router.get('/', isLoggedIn, controller.viewOffers);

router.put('/:offerId/accept', isLoggedIn, validateId, controller.acceptOffer);

module.exports = router;

