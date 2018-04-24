var router = require('express').Router();
var controller = require('./habitController');

// Get ID information when using /:id route
router.param('id', controller.params);
//router.param('userId', controller.paramsbyUser);


// POST new habit
router.route('/')
  .post(controller.post)

// GET all habits
router.route('/')
  .get(controller.get)

// GET, PUT and DELETE habit
router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

router.route('/user/:userId')
  .get(controller.getbyUser)

module.exports = router;
