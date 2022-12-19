const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { postUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');
const validatedUser = require('./utils/validation');

mongoose.set('strictQuery', false);

const app = express();
const { PORT = 3000 } = process.env;
const constants = require('./utils/constants');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '63965591a3e2e5473bdc580e',
//   };

//   next();
// });

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError(constants.messages.pageError));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.post('/signin', validatedUser, login);
app.post('/signup', validatedUser, postUser);
