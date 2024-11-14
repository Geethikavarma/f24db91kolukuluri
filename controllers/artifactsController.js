const Artifact = require('../models/artifact'); // Replace with correct path
const artifacts = require('../models/artifacts');

// List all gadgets
exports.artifacts_list = async (req, res) => {
  try {
    const artifacts = await artifacts.find();
    res.status(200).json(artifacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch artifacts' });
  }
};

// Get a specific Gadget by ID
exports.artifact_detail = function(req, res) {
  Gadget.findById(req.params.id, function(err, artifact) {
    if (err || !gadget) return res.status(404).json({ message: "Gadget not found" });
    res.status(200).json(artifact);
  });
};

// Create a new Gadget
exports.gadget_create_post = async (req, res) => {
  const newGadget = new Gadget({
    artifact_name: req.body.artifact_name,
    artifact_age: req.body.artifact_age,
    origin_culture: req.body.origin_culture
  });
  try {
    await newArtifact.save();
    res.status(201).json({ message: 'Artifact created successfully', artifact: newArtifact });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create artifact', error: err.message });
  }
};

// Delete a Gadget by ID
exports.artifact_delete = function(req, res) {
  Artifact.findByIdAndDelete(req.params.id, function(err) {
    if (err) return res.status(500).json({ message: "Error deleting artifact" });
    res.status(204).send();
  });
};

// Update a Gadget by ID
exports.artifact_update_put = function(req, res) {
  Artifact.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedArtifact) {
    if (err) return res.status(500).json({ message: "Error updating artifact" });
    res.status(200).json(updatedArtifact);
  });
};