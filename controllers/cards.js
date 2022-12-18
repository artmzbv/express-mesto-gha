const Card = require('../models/card');
const constants = require('../constants/constants');

const userObjects = ['owner', 'likes'];

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.validationError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(constants.numbers.notFound).send({ message: constants.messages.searchError });
      } else {
        res.send({ data: card });
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
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(userObjects)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.validationError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(userObjects)
    .then((card) => {
      if (!card) {
        res.status(constants.numbers.notFound).send({ message: constants.messages.searchError });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === constants.names.castError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.likesError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(userObjects)
    .then((card) => {
      if (!card) {
        res.status(constants.numbers.notFound).send({ message: constants.messages.searchError });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === constants.names.castError) {
        res.status(constants.numbers.validationError)
          .send({ message: constants.messages.dislikesError });
      } else {
        res.status(constants.numbers.serverError).send({ message: constants.messages.serverError });
      }
    });
};
