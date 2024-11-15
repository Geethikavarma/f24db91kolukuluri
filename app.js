// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

// Route imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var artifactsRouter = require('./routes/artifacts');  
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource'); 

// MongoDB imports
const mongoose = require('mongoose');
const Artifact = require("./models/artifacts");

var app = express();

// MongoDB connection setup
mongoose.connect(process.env.MONGO_CON, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`MongoDB connection error: ${err}`));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());  // Body parser middleware to handle JSON payload
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Route setup
app.use('/', indexRouter);  // Route for homepage
app.use('/users', usersRouter);  // Route for users
app.use('/resource', resourceRouter);  // API for resource routes
app.use('/grid', gridRouter);  // Route for /grid
app.use('/artifacts', artifactsRouter);  // Route for /artifacts
app.use('/pick', pickRouter);  // Route for /pick

// PUT Method for updating an artifact
app.put('/artifacts/:id', async (req, res) => {
  try {
    let artifact = await Artifact.findById(req.params.id);
    if (!artifact) {
      return res.status(404).json({ message: 'Artifact not found' });
    }
    if (req.body.artifact_type) artifact.artifact_type = req.body.artifact_type;
    if (req.body.origin) artifact.origin = req.body.origin;
    if (req.body.age) artifact.age = req.body.age;
    
    const updatedArtifact = await artifact.save();
    res.status(200).json(updatedArtifact);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
});

// Seed the database with artifacts if reseed is true
let reseed = true;  
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

// 404 Error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// MongoDB Connection Status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

module.exports = app;
