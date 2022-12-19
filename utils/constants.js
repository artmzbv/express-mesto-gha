const constants = {
  names: {
    castError: 'CastError',
    validationError: 'ValidationError',
  },
  messages: {
    searchError: 'Запрашиваемый пользователь не найден',
    pageError: 'Страница не найдена',
    validationError: 'Переданы неправильные данные',
    likesError: 'Переданы некорректные данные для постановки лайка',
    dislikesError: 'Переданы некорректные данные для снятия лайка',
    avatarError: 'Переданы некорректные данные при обновлении аватара',
    conflictError: 'Такой пользователь уже есть',
    forbiddenError: 'Нет прав для удаления',
  },
};

module.exports = constants;
