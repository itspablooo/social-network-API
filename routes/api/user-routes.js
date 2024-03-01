const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;