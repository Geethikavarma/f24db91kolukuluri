const mongoose = require('mongoose');
const Artifact = require('../models/artifacts');

// List all artifacts
const artifact_list = async function (req, res) {
  try {
    const artifacts = await Artifact.find();
    res.render('artifacts', { title: 'Artifacts List', results: artifacts });
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch artifacts' });
  }
};

// Get details of a specific artifact by ID
const artifact_detail = async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid artifact ID" });
  }
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

// Render the detail page for a single artifact
const artifact_view_one_Page = async function (req, res) {
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

// Create a new artifact
const artifact_create_post = async function (req, res) {
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

// Update an existing artifact by ID
const artifact_update_put = async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid artifact ID" });
  }
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
const artifact_delete = async function (req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid artifact ID" });
  }
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

// Export all functions
module.exports = {
  artifact_list,
  artifact_detail,
  artifact_view_one_Page,
  artifact_create_post,
  artifact_update_put,
  artifact_delete,
};
