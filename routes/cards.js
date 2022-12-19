const router = require('express').Router();
const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validatedCard, validatedCardId } = require('../utils/validation');

router.post('/cards', validatedCard, createCard);

router.get('/cards', getCards);

router.delete('/cards/:cardId', validatedCardId, deleteCardById);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
