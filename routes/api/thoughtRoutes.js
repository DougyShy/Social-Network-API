const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  createThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;