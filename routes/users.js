/* eslint-disable linebreak-style */
const router = require('express').Router();
const {
  postUser, getUserById, getUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', postUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
