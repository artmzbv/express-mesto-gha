const router = require('express').Router();

const {
  getUserById,
  getUsers,
  postUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', postUser);


module.exports = router;
