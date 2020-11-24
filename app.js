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
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'client/build'), {
  etag: false, // Just being explicit about the default.
  lastModified: false, // Just being explicit about the default.
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // All of the project's HTML files end in .html
      res.setHeader('Cache-Control', 'private,no-cache,no-store,max-age=0,must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '-1');
    }
    if (path.endsWith('.css')) {
      // All of the project's HTML files end in .html
      res.setHeader('Cache-Control', 'private,no-cache,no-store,max-age=0,must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '-1');
    }
    if (path.endsWith('.js')) {
      // All of the project's HTML files end in .html
      res.setHeader('Cache-Control', 'private,no-cache,no-store,max-age=0,must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '-1');
    }
  },
}));
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
