/* eslint-disable linebreak-style */
const User = require('../models/user');

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Что-то не так с сервером' });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') { res.status(400).send({ message: 'Отправлены неправильные данные' }); } else {
        res.status(500).send({ message: 'Что-то не так с сервером' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Что-то не так с сервером' }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Что-то не так с сервером' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      } else { res.send({ data: user }); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Что-то не так с сервером' });
      }
    });
};
