const express = require('express');
const controller = require('../controllers/itemController'); 
const { upload } = require('../middlewares/fileUpload');
const {isLoggedIn} = require('../middlewares/auth');
const {isOwner} = require('../middlewares/auth')
const {validateId} = require('../middlewares/validator')

const router = express.Router();

router.get('/', controller.index);

router.get('/new', isLoggedIn, controller.new);

router.post('/', isLoggedIn, upload, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', validateId, isLoggedIn, isOwner, controller.edit);

router.put('/:id', validateId, isLoggedIn, isOwner,  upload, controller.update);

router.delete('/:id', validateId, isLoggedIn, isOwner, controller.delete);


module.exports = router;
