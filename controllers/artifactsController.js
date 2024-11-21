const mongoose = require('mongoose');
const Artifact = require('../models/artifacts');

// List all artifacts
exports.artifact_list = async function (req, res) {
  try {
    const artifacts = await Artifact.find();
    res.render('artifacts', { title: 'Artifacts List', results: artifacts });
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch artifacts' });
  }
};

// Create a new artifact
exports.artifact_create_post = async function (req, res) {
  try {
    const { artifact_type, origin, age } = req.body;
    if (!artifact_type || !origin || !age) {
      return res.status(400).json({ message: "All fields (artifact_type, origin, age) are required" });
    }
    const newArtifact = new Artifact({ artifact_type, origin, age });
    const savedArtifact = await newArtifact.save();
    res.status(201).json(savedArtifact);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Render the detail page for a single artifact
exports.artifact_view_one_Page = async function (req, res) {
  const artifactId = req.query.id;

  console.log("Received artifact ID:", artifactId);

  if (!mongoose.Types.ObjectId.isValid(artifactId)) {
    console.log("Invalid ObjectId format detected");
    return res.status(400).send({ error: "Invalid artifact ID format" });
  }

  try {
    const artifact = await Artifact.findById(artifactId);
    if (!artifact) {
      console.log(`Artifact not found with ID: ${artifactId}`);
      return res.status(404).send({ message: "Artifact not found" });
    }

    console.log("Artifact data found:", artifact);
    res.render('artifactdetail', { title: 'Artifact Detail', artifact });
  } catch (err) {
    console.error("Error fetching artifact:", err);
    res.status(500).send({ error: `Error: ${err.message}` });
  }
};

module.exports = {
  artifact_list,
  artifact_detail,
  artifact_view_one_Page,
  artifact_create_post,
  artifact_update_put,
  artifact_delete,
};

