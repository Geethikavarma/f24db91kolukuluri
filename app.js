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
var artifactsRouter = require('./routes/artifacts');  // Add the artifacts router
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');  // Resource router

// MongoDB imports
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ajithanarra24:ugekUdGXDkr3vqem@cluster0.m85be.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  serverSelectionTimeoutMS: 10000,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Database connection error:', err);
});
const Artifact = require("./models/artifacts");

var app = express();

// MongoDB connection setup

// Middleware setup
app.use(logger('dev'));
app.use(express.json());  // Add body parser middleware to handle JSON payload
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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

// Error handler for 404
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
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
    const instance1 = new Artifact({ artifact_type: "vase", origin: "Greece", age: 2000 });
    const instance2 = new Artifact({ artifact_type: "sword", origin: "Japan", age: 800 });
    const instance3 = new Artifact({ artifact_type: "painting", origin: "Italy", age: 500 });
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