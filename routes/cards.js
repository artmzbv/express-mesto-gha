const router = require('express').Router();
const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validatedCard, validatedCardId } = require('../utils/validation');

router.post('/cards', validatedCard, createCard);

router.get('/cards', getCards);

router.delete('/cards/:id', validatedCardId, deleteCardById);

router.put('/cards/:id/likes', validatedCardId, likeCard);

router.delete('/cards/:id/likes', validatedCardId, dislikeCard);

module.exports = router;
