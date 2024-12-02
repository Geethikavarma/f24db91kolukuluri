var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

// Routes imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var artifactsRouter = require('./routes/artifacts');  
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');  

// MongoDB imports
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://s574391:Geethika22@cluster0.ijbao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  serverSelectionTimeoutMS: 10000,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Database connection error:', err);
});
const Artifact = require("./models/artifacts");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)
var app = express();

// MongoDB connection setup

// Middleware setup
app.use(logger('dev'));
app.use(express.json());  // Add body parser middleware to handle JSON payload
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
// View engine setup (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Routes setup
app.use('/resource', resourceRouter);  // API for resource routes
app.use('/grid', gridRouter);  // Route for /grid
app.use('/artifacts', artifactsRouter);  // Route for /artifacts
app.use('/pick', pickRouter);  // Route for /pick
app.use('/', indexRouter);  // Route for the homepage
app.use('/users', usersRouter);  // Route for users
// passport config
// Use the existing connection
// The Account model 
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser())
// Error handler for 404
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});
let reseed = true;  // Set to false to prevent reseeding
if (reseed) {
  async function recreateDB() {
    await Artifact.deleteMany();
    const instance1 = new Artifact({ artifact_type: "The Rosetta Vase", origin: "Egypt", age: 3000 });
    const instance2 = new Artifact({ artifact_type: "The Viking Shield", origin: "Scandinavia", age: 1200 });
    const instance3 = new Artifact({ artifact_type: "The Terracotta Figurine", origin: "Indus Valley Civilization", age: 4500 });
    await instance1.save();
    await instance2.save();
    await instance3.save();
    console.log("Database seeded with artifacts!");
  }
  recreateDB();
}

// MongoDB Connection Status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = app;