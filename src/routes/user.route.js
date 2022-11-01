const router = require('express').Router();

const UserController = require('../controllers/user.controller');

router.route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser);

router.route('/:id')
  .get(UserController.getUser)
  .patch(UserController.editUser)
  .delete(UserController.deleteUser);

module.exports = router;
