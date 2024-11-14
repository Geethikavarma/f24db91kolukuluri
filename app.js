var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid'); // Ensure this file exists
var artifactsRouter = require('./routes/artifacts'); // Add the artifacts router
var pickRouter = require('./routes/pick');
var app = express();
const mongoose = require('mongoose');
const Artifact = require("./models/artifacts");
const resourceRouter = require('./routes/resource');
const resourceRouter = require('./routes/resource');

app.use('/resource', resourceRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/resource', resourceRouter);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/grid', gridRouter); // Route for /grid
app.use('/artifacts', artifactsRouter); // Route for /artifacts
app.use('/pick', pickRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
mongoose.connect(process.env.MONGO_CON);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

async function recreateDB() {
  // Delete all existing artifacts
  await Artifact.deleteMany();

  // Create new artifact instances
  let instance1 = new Artifact({ artifact_type: "vase", origin: "Greece", age: 2000 });
  let instance2 = new Artifact({ artifact_type: "sword", origin: "Japan", age: 800 });
  let instance3 = new Artifact({ artifact_type: "painting", origin: "Italy", age: 500 });

  // Save each instance to the database
  await instance1.save();
  await instance2.save();
  await instance3.save();

  console.log("Database seeded with artifacts!");
}
let reseed = true;  // Set to false to prevent reseeding
if (reseed) {
  recreateDB();
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = app;
