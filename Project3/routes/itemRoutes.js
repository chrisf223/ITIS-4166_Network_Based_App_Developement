const express = require('express');
const controller = require('../controllers/itemController'); 
const { upload } = require('../public/javascript/fileUpload');

const router = express.Router();

router.get('/', controller.index);

router.get('/new', controller.new);

router.post('/', upload, controller.create);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.put('/:id', upload, controller.update);

router.delete('/:id', controller.delete);


module.exports = router;
