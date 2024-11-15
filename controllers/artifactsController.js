// controllers/artifactsController.js
const Artifact = require('../models/artifacts');

// List all artifacts (already implemented)
exports.artifact_list = async function(req, res) {
  try {
    const artifacts = await Artifact.find();
    res.json(artifacts);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch artifacts' });
  }
};

// Create a new artifact (already implemented)
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

// Get details of a specific artifact by ID
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

// Update an existing artifact by ID
exports.artifact_update_put = async function(req, res) {
  try {
    let artifact = await Artifact.findById(req.params.id);
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    if (req.body.artifact_type) artifact.artifact_type = req.body.artifact_type;
    if (req.body.origin) artifact.origin = req.body.origin;
    if (req.body.age) artifact.age = req.body.age;

    const updatedArtifact = await artifact.save();
    res.status(200).json(updatedArtifact);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

// Delete an artifact by ID
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
