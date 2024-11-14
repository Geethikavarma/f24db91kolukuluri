// controllers/artifactsController.js
const Artifact = require('../models/artifacts');  // Ensure the path is correct and 'Artifact' model exists

// List all artifacts
exports.artifact_list = async function(req, res) {
  try {
    const artifacts = await Artifact.find();
    res.status(200).json(artifacts);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Create a new artifact (POST)
exports.artifact_create_post = async function(req, res) {
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

// Get details of a specific artifact
exports.artifact_detail = async function(req, res) {
  try {
    const artifact = await Artifact.findById(req.params.id);
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
    res.status(200).json(artifact);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Update an existing artifact
exports.artifact_update_put = async function(req, res) {
  try {
    const updatedArtifact = await Artifact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArtifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
    res.status(200).json(updatedArtifact);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Delete an artifact
exports.artifact_delete = async function(req, res) {
  try {
    const deletedArtifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!deletedArtifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
    res.status(200).json({ message: "Artifact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};
