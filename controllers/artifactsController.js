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
  const artifactId = req.query.id;  // Get the artifact ID from the query parameter

  // Log the received ID for debugging purposes
  console.log("Received artifact ID:", artifactId);

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(artifactId)) {
    console.log("Invalid ObjectId format detected");
    return res.status(400).send({ error: "Invalid artifact ID format" });
  }

  try {
    // Fetch the artifact by its ID
    const artifact = await Artifact.findById(artifactId);
    
    // If artifact is not found
    if (!artifact) {
      console.log(`Artifact not found with ID: ${artifactId}`);
      return res.status(404).send({ message: "Artifact not found" });
    }

    console.log("Artifact data found:", artifact); // Log the artifact data

    // Render the artifact detail page
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


// Render the page for creating a new artifact
// Controller to render the artifact creation page
exports.artifact_create_Page = function(req, res) {
  try {
    // Render the 'artifactcreate' Pug view and pass the title
    res.render('artifactcreate', { title: 'Create Artifact' }); 
  } catch (err) {
    res.status(500);
    res.send(`Error: ${err.message}`);
  }
};


// Handle form submission to create a new artifact
exports.artifact_create_post = async function(req, res) {
  const { artifact_type, origin, age } = req.body;
  
  // Validate that all fields are provided
  if (!artifact_type || !origin || !age) {
    return res.status(400).json({ success: false, message: "All fields (artifact_type, origin, age) are required" });
  }

  try {
    // Create and save the new artifact
    const newArtifact = new Artifact({ artifact_type, origin, age });
    await newArtifact.save();
    
    // Return a success response
    res.status(201).json({ success: true, message: "Artifact created successfully" });
  } catch (err) {
    // If there's an error, send a response with the error message
    res.status(500).json({ success: false, message: `Error: ${err.message}` });
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
  artifact_detail,  // Make sure this is included in module.exports
  artifact_create_post,
  artifact_update_put,
  artifact_delete,

  artifact_create_post,
};
