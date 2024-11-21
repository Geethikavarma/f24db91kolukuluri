const artifacts = require('../models/artifacts');

exports.artifacts_list = async function (req, res) {
    try {
        const artifacts = await artifacts.find();
        res.send(artifacts);
    } catch (err) {
        res.status(500);
        res.send({ "error": err.message });
    }
};


exports.artifacts_view_all_Page = async function (req, res) {
    try {
        results = await artifacts.find();  // Fetch all artifacts sites from the DB
        res.render('artifactss', { title: 'artifacts Sites', results: results });  // Render the view with results
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);  // Handle errors and send a response
    }
};



// For a specific artifacts Site
exports.artifacts_detail = async function (req, res) {
    console.log("Detail of artifacts Site with ID:", req.params.id);
    try {
        const result = await artifacts.findById(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "artifacts Site document for ID ${req.params.id} not found"}`);
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${error.message}"}`);
    }
};


// Handle artifacts Site create on POST
exports.artifacts_create_post = async function (req, res) {
    console.log(req.body)
    let document = new artifacts();
    document.site_name = req.body.site_name;
    document.location = req.body.location;
    document.year_established = req.body.year_established;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle building the view for deleting a artifacts site.
// Query provides the ID
exports.artifacts_delete_Page = async function (req, res) {
    console.log("Delete view for artifacts site with ID " + req.query.id);
    try {
        let result = await artifacts.findById(req.query.id); // Find the site by ID
        res.render('artifactsdelete', { title: 'artifacts Site Delete', toShow: result });
    } catch (err) {
        console.error(err); // Log any error
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Handle artifacts Site delete on DELETE
exports.artifacts_delete = async function (req, res) {
    console.log("Deleting artifacts Site with ID:", req.params.id);
    try {
        const result = await artifacts.findByIdAndDelete(req.params.id);
        if (!result) {
            res.status(404).send(`{"error": "artifacts Site document for ID ${req.params.id} not found"}`);
        } else {
            console.log("Removed:", result);
            res.send(`{"message": "artifacts Site document with ID ${req.params.id} deleted successfully"}`);
        }
    } catch (err) {
        console.error("Error deleting document:", err);
        res.status(500).send(`{"error": "Error deleting document for ID ${req.params.id}: ${err.message}"}`);
    }
};



// Handle artifacts Site update form on PUT.
exports.artifacts_update_put = async function (req, res) {
    console.log(`Updating artifacts Site with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await artifacts.findById(req.params.id);

        // Update fields if they are present in the request body
        if (req.body.site_name) toUpdate.site_name = req.body.site_name;
        if (req.body.location) toUpdate.location = req.body.location;
        if (req.body.year_established) toUpdate.year_established = req.body.year_established;

        // Checkbox example: converting undefined to false if unchecked
        toUpdate.is_famous = req.body.checkbox_famous ? true : false;

        let result = await toUpdate.save();
        console.log("Update successful:", result);
        res.send(result);
    } catch (err) {
        console.error("Error updating document:", err);
        res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
    }
};

// Handle displaying one artifacts Site by ID
exports.artifacts_view_one_Page = async function (req, res) {
    console.log("Single view for ID:", req.query.id);
    try {
        const result = await artifacts.findById(req.query.id);
        if (!result) {
            res.status(404).send(`{"error": "artifacts Site with ID ${req.query.id} not found"}`);
        } else {
            res.render('artifactsDetail', {
                title: 'artifacts Site Detail',
                toShow: result
            });
        }
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a artifacts site
exports.artifacts_create_Page = function (req, res) {
    console.log("create view");
    try {
        res.render('artifactscreate', { title: 'artifacts Site Create' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a artifacts site.
// Query provides the id.
exports.artifacts_update_Page = async function(req, res) {
    console.log("Update view for artifacts site with ID " + req.query.id);
    try {
        let result = await artifacts.findById(req.query.id);
        res.render('artifactsupdate', { title: 'artifacts Site Update', toShow: result });
    } catch (err) {
        res.status(500).send(`{"error": "${err}"}`);
    }
};
