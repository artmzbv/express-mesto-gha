const { celebrate, Joi } = require('celebrate');

const limitedRef = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;

const validatedUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(limitedRef),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatedCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(limitedRef),
  }),
});

const validatedCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validatedProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validatedUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validatedAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(limitedRef),
  }),
});

module.exports = {
  validatedUser,
  validatedUserId,
  validatedProfile,
  validatedAvatar,
  validatedCard,
  validatedCardId,
};
