const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const apiroutesManager = require('./routes/api.routes');

const app = express();

// db
mongoose.connect(config.get('app.db'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(helmet());
app.use('/api/v1', apiroutesManager);
// view engine setup
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}
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
