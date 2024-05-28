const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(deleteFriend);
//router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;