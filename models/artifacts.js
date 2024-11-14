const mongoose = require("mongoose");
const artifactSchema = mongoose.Schema({
  artifact_type: String,
  origin: String,
  age: Number
});
module.exports = mongoose.model("Artifact", artifactSchema);
