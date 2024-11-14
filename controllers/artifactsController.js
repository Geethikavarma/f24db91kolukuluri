// controllers/artifactsController.js
var Artifact = require('../models/artifacts');  // Ensure this path is correct and 'Artifact' model exists

// List all artifacts
exports.artifact_list = async function(req, res) {
    try {
        // Fetch all artifacts from the MongoDB database
        const artifacts = await Artifact.find({});
        
        // Send the fetched artifacts as a JSON response
        res.status(200).json(artifacts);
    } catch (err) {
        // If an error occurs, respond with a 500 status code and the error message
        res.status(500).json({
            message: 'Error retrieving artifacts',
            error: err.message
        });
    }
};

// Create a new artifact (POST)
exports.artifact_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: artifact create POST');
};

// Get details of a specific artifact
exports.artifact_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: artifact detail ' + req.params.id);
};

// Update an existing artifact
exports.artifact_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: artifact update PUT ' + req.params.id);
};

// Delete an artifact
exports.artifact_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: artifact delete DELETE ' + req.params.id);
};
