const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artifactSchema = new Schema({
    artifact_type: { type: String, required: true },
    origin: { type: String, required: true },
    age: { type: Number, required: true },
});

module.exports = mongoose.model('Artifact', artifactSchema);
