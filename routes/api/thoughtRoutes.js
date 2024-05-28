const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts); //.post(createUser);
router.route('/:thoughtId').get(getSingleThought);
//router.route('/')

module.exports = router;