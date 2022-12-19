const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },

    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },

    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(avatar) {
          return validator.isURL(avatar);
        },
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Email введен неправильно',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(constants.messages.validationError),
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(constants.messages.validationError),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('users', userSchema);
