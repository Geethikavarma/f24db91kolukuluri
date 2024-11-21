const Artifact = require('../models/artifacts');

// List all artifacts
exports.artifact_list = async function (req, res) {
    try {
        const artifacts = await Artifact.find();
        res.send(artifacts);
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
};

// Render the page to view all artifacts
exports.artifact_view_all_Page = async function (req, res) {
    try {
        const results = await Artifact.find();
        res.render('artifacts', { title: 'Artifacts', results: results });
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Display details for a specific artifact
exports.artifact_detail = async function (req, res) {
    console.log("Detail of Artifact with ID:", req.params.id);
    try {
        const result = await Artifact.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Artifact document for ID ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (err) {
        res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${err.message}"}`);
    }
};

// Create a new artifact (POST request)
exports.artifact_create_post = async function (req, res) {
    console.log(req.body);
    let document = new Artifact();
    document.name = req.body.name;
    document.description = req.body.description;
    document.origin = req.body.origin;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Render delete page for an artifact
exports.artifact_delete_Page = async function (req, res) {
    console.log("Delete view for artifact with ID", req.query.id);
    try {
        const result = await Artifact.findById(req.query.id);
        res.render('artifactdelete', { title: 'Delete Artifact', toShow: result });
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Delete an artifact
exports.artifact_delete = async function (req, res) {
    console.log("Deleting Artifact with ID:", req.params.id);
    try {
        const result = await Artifact.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "Artifact document for ID ${req.params.id} not found"}`);
        } else {
            res.send(`{"message": "Artifact document with ID ${req.params.id} deleted successfully"}`);
        }
    } catch (err) {
        res.status(500).send(`{"error": "Error deleting document for ID ${req.params.id}: ${err.message}"}`);
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
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
    }
};

// Render page to create an artifact
exports.artifact_create_Page = function (req, res) {
    console.log("Create artifact view");
    try {
        res.render('artifactcreate', { title: 'Create Artifact' });
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Render page to update an artifact
exports.artifact_update_Page = async function (req, res) {
    console.log("Update view for artifact with ID", req.query.id);
    try {
        const result = await Artifact.findById(req.query.id);
        res.render('artifactupdate', { title: 'Update Artifact', toShow: result });
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Render page to view one artifact
exports.artifact_view_one_Page = async function (req, res) {
    console.log("Single view for Artifact ID:", req.query.id);
    try {
        const result = await Artifact.findById(req.query.id);
        res.render('artifactDetail', { title: 'Artifact Detail', toShow: result });
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};
