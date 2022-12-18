const constants = {
  names: {
    castError: 'CastError',
    validationError: 'ValidationError',
  },
  messages: {
    searchError: 'Запрашиваемый пользователь не найден',
    pageError: 'Страница не найдена',
    validationError: 'Переданы неправильные данные',
    serverError: 'Что-то не так с сервером',
    likesError: 'Переданы некорректные данные для постановки лайка',
    dislikesError: 'Переданы некорректные данные для снятия лайка',
    avatarError: 'Переданы некорректные данные при обновлении аватара',
  },
  numbers: {
    validationError: 400,
    notFound: 404,
    serverError: 500,
  },
};

module.exports = constants;
