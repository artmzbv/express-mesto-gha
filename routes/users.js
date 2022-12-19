const router = require('express').Router();
const {
  getUserById, getUsers, updateProfile, updateAvatar,
} = require('../controllers/users');
const { validatedUserId, validatedProfile, validatedAvatar } = require('../utils/validation');

router.get('/users', getUsers);

router.get('/users/:id', validatedUserId, getUserById);

// router.post('/users', postUser);

router.patch('/users/me', updateProfile);

router.patch('/me', validatedProfile, updateProfile);

router.patch('/users/me/avatar', validatedAvatar, updateAvatar);

module.exports = router;
