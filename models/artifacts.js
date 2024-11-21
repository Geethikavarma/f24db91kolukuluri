const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
  artifact_type: {
    type: String,
    required: [true, 'Artifact type is required'],
  },
  origin: {
    type: String,
    required: [true, 'Origin is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative'],
  }
});

// Error handling: If validation fails, throw an error with details
artifactSchema.post('save', function (error, doc, next) {
  if (error.name === 'ValidationError') {
    let messages = Object.values(error.errors).map(val => val.message);
    next(new Error(messages.join(', ')));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Artifact', artifactSchema);
