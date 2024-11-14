// controllers/artifactsController.js
var Artifact = require('../models/artifacts');  // Ensure the correct path to the model

// List all artifacts (fetch from MongoDB and render view)
exports.artifact_list = async function(req, res) {
  try {
    // Fetch all artifacts from MongoDB
    const artifacts = await Artifact.find();
    // Render the Pug view and pass the fetched artifacts as 'results'
    res.render('artifacts', { results: artifacts });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
