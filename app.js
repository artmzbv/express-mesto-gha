const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { postUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');
const { validatedUser } = require('./utils/validation');
const errorHandler = require('./utils/errorHandler');

mongoose.set('strictQuery', false);

const app = express();
const { PORT = 3000 } = process.env;
const constants = require('./utils/constants');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validatedUser, login);
app.post('/signup', validatedUser, postUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use(('/', auth, (req, res, next) => {
  next(new NotFoundError(constants.messages.pageError));
}));

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
