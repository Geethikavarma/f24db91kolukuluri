const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// Routes imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const artifactsRouter = require('./routes/artifacts');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');

// MongoDB imports
const mongoose = require('mongoose');
const Artifact = require("./models/artifacts");

const app = express();


// MongoDB connection setup
mongoose.connect(process.env.MONGO_CON, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`MongoDB connection error: ${err}`));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Routes setup
app.use('/resource', resourceRouter);
app.use('/grid', gridRouter);
app.use('/artifacts', artifactsRouter);
app.use('/pick', pickRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Error handler for 404
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Reseed database on startup
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

// MongoDB Connection Status
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error(`MongoDB connection error: ${err}`));

module.exports = app;
