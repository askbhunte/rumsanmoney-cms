const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const routesManager = require('./routes/index');

const app = express();

// db
mongoose.connect(config.get('app.db'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// view engine setup
app.use(express.static(path.join(__dirname, 'client/build')));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use('/', routesManager);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
