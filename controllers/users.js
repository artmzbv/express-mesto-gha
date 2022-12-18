const User = require('../models/user');
const constants = require('../constants/constants');

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.validationError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(constants.numbers.notFound).send({ message: constants.messages.searchError });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === constants.names.castError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.validationError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(constants.numbers.serverError)
      .send({ message: constants.messages.serverError }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(constants.numbers.notFound).send({ message: constants.messages.searchError });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.dislikesError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(constants.numbers.notFound).send({ message: constants.messages.searchError });
      } else { res.send({ data: user }); }
    })
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.avatarError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};
