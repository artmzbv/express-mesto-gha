const Card = require('../models/card');
const ValidationError = require('../constants/ValidationError');
const NotFoundError = require('../constants/NotFoundError');
const ServerError = require('../constants/ServerError');

const userObjects = ['owner', 'likes'];

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные карточки'));
      } else {
        next(new ServerError('Что-то не так с сервером'));
      }
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные карточки'));
      } else {
        next(new ServerError('Что-то не так с сервером'));
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(userObjects)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные карточки'));
      } else {
        next(new ServerError('Что-то не так с сервером'));
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
        next(new NotFoundError('Передан несуществующий id карточки.'));
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для постановки лайка.'));
      } else {
        next(new ServerError('Что-то не так с сервером'));
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
        next(new NotFoundError('Передан несуществующий id карточки.'));
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для снятия лайка.'));
      } else {
        next(new ServerError('Что-то не так с сервером'));
      }
    });
};
