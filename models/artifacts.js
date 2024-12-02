// models/artifacts.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artifactSchema = new Schema({
  artifact_type: { 
    type: String, 
    required: true, 
    minlength: [3, 'Site name must be at least 3 characters long'], 
    maxlength: [100, 'Site name cannot exceed 100 characters']
  },
  origin: { 
    type: String, 
    required: [true, 'Origin is required'],
    minlength: [3, 'Origin must be at least 3 characters long'],
    maxlength: [50, 'Origin cannot exceed 50 characters'],
    trim: true, // Optional: Removes extra spaces
  },
  age: { 
    type: Number, 
    required: true,
    min: [100, 'Minimum age must be 100 years']
  },
});


const Artifact = mongoose.model('Artifact', artifactSchema);
module.exports = Artifact;