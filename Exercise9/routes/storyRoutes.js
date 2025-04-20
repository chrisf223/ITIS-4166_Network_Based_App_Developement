const express = require('express');
const controller = require('../controllers/storyController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId, validateStory, validateResult} = require('../middlewares/validator');

const router = express.Router();

router.get('/', controller.index);
router.get('/new', isLoggedIn, controller.new);
router.post('/', isLoggedIn, validateStory, validateResult, controller.create);
router.get('/:id', validateId, controller.show);
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);
router.put('/:id', validateId, isLoggedIn, isAuthor, validateStory, validateResult, controller.update);
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

module.exports = router;