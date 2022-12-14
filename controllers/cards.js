const Card = require('../models/card');
const constants = require('../utils/constants');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        next(new ValidationError(constants.messages.validationError));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        next(new NotFoundError(constants.messages.searchError));
      } else if (req.user._id !== card.owner.toString()) {
        next(new ForbiddenError(constants.messages.forbiddenError));
      } else {
        Card.findByIdAndRemove(req.params.id).then((deletedcard) => {
          res.send({ data: deletedcard });
        }).catch(next);
      }
    })
    .catch((err) => {
      if (err.name === constants.names.castError) {
        next(new ValidationError(constants.messages.validationError));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(constants.messages.searchError));
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === constants.names.castError) {
        next(new ValidationError(constants.messages.likesError));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(constants.messages.searchError));
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === constants.names.castError) {
        next(new ValidationError(constants.messages.dislikesError));
      } else {
        next(err);
      }
    });
};
