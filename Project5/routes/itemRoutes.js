const express = require('express');
const controller = require('../controllers/itemController');
const { upload } = require('../middlewares/fileUpload');
const { isLoggedIn, isOwner } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');
const { validateItem } = require('../middlewares/modelValidation');
const offerRoutes = require('./offerRoutes');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, upload, validateItem, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isOwner, controller.edit);

router.put('/:id', validateId, isLoggedIn, isOwner, upload, validateItem, controller.update);

router.delete('/:id', validateId, isLoggedIn, isOwner, controller.delete);

router.use('/:id/offers', offerRoutes);

module.exports = router;

