const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const cors = require('cors'); // Import CORS package

// Routes imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const artifactsRouter = require('./routes/artifacts'); // Artifacts routes
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');

// MongoDB imports
const mongoose = require('mongoose');
const Artifact = require('./models/artifacts');

const app = express();

// Enable CORS for all origins
app.use(cors());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_CON, {
  connectTimeoutMS: 30000, // 30-second connection timeout
  socketTimeoutMS: 30000,  // 30-second socket timeout
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup (Pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes setup
app.use('/resource', resourceRouter);
app.use('/grid', gridRouter);
app.use('/artifacts', artifactsRouter); // Artifacts routes support
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

module.exports = app;
