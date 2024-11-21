const Artifact = require('../models/artifacts');

// List all artifacts
exports.artifact_list = async function (req, res) {
    try {
        const artifacts = await Artifact.find();
        res.status(200).json(artifacts);  // Send JSON response with status code 200
    } catch (err) {
        res.status(500).json({ error: err.message });  // Properly formatted JSON error response
    }
};

// Render the page to view all artifacts (for rendering in views)
exports.artifact_view_all_Page = async function (req, res) {
    try {
        const results = await Artifact.find();
        res.render('artifacts', { title: 'Artifacts', results: results });
    } catch (err) {
        res.status(500).json({ error: err.message });  // Properly formatted JSON error response for server-side rendering
    }
};

// Display details for a specific artifact
exports.artifact_detail = async function (req, res) {
  try {
      const result = await Artifact.findById(req.params.id).exec();
      if (!result) {
          res.status(404).send(`{"error": "Artifact not found"}`);
      } else {
          res.send(result);
      }
  } catch (err) {
      console.error('Error retrieving artifact:', err);  // Log detailed error
      res.status(500).send(`{"error": "Error retrieving document: ${err.message}"}`);
  }
};

// Create a new artifact (POST request)
exports.artifact_create_post = async function (req, res) {
  console.log('Request Body:', req.body);  // Log the request body to debug

  let document = new Artifact({
      name: req.body.name,
      description: req.body.description,
      origin: req.body.origin,
  });

  try {
      let result = await document.save();
      res.send(result);  // Send back the saved document
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
};

// Render delete page for an artifact
exports.artifact_delete_Page = async function (req, res) {
    console.log("Delete view for artifact with ID", req.query.id);
    try {
        const result = await Artifact.findById(req.query.id);
        res.render('artifactdelete', { title: 'Delete Artifact', toShow: result });
    } catch (err) {
        res.status(500).json({ error: err.message });  // JSON error response for server-side error
    }
};

// Delete an artifact
exports.artifact_delete = async function (req, res) {
    console.log("Deleting Artifact with ID:", req.params.id);
    try {
        const result = await Artifact.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).json({ error: `Artifact document for ID ${req.params.id} not found` });  // JSON error for not found
        } else {
            res.status(200).json({ message: `Artifact document with ID ${req.params.id} deleted successfully` });  // Success message in JSON format
        }
    } catch (err) {
        res.status(500).json({ error: `Error deleting document for ID ${req.params.id}: ${err.message}` });  // JSON error response
    }
};

// Update an artifact (PUT request)
exports.artifact_update_put = async function (req, res) {
    console.log(`Updating Artifact with ID: ${req.params.id}`);
    try {
        let toUpdate = await Artifact.findById(req.params.id);
        if (req.body.name) toUpdate.name = req.body.name;
        if (req.body.description) toUpdate.description = req.body.description;
        if (req.body.origin) toUpdate.origin = req.body.origin;

        let result = await toUpdate.save();
        res.status(200).json({ message: 'Artifact updated successfully', artifact: result });  // Success message with updated artifact in JSON format
    } catch (err) {
        res.status(500).json({ error: `Update for ID ${req.params.id} failed: ${err.message}` });  // JSON error response
    }
};

// Render page to create an artifact
exports.artifact_create_Page = function (req, res) {
    console.log("Create artifact view");
    try {
        res.render('artifactcreate', { title: 'Create Artifact' });
    } catch (err) {
        res.status(500).json({ error: err.message });  // JSON error response for server-side rendering
    }
};

// Render page to update an artifact
exports.artifact_update_Page = async function (req, res) {
    console.log("Update view for artifact with ID", req.query.id);
    try {
        const result = await Artifact.findById(req.query.id);
        res.render('artifactupdate', { title: 'Update Artifact', toShow: result });
    } catch (err) {
        res.status(500).json({ error: err.message });  // JSON error response for server-side rendering
    }
};

// Render page to view one artifact
exports.artifact_view_one_Page = async function (req, res) {
    console.log("Single view for Artifact ID:", req.query.id);
    try {
        const result = await Artifact.findById(req.query.id);
        res.render('artifactDetail', { title: 'Artifact Detail', toShow: result });
    } catch (err) {
        res.status(500).json({ error: err.message });  // JSON error response for server-side rendering
    }
};
