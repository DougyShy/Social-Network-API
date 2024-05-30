const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  createThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
//router.route('/')

module.exports = router;