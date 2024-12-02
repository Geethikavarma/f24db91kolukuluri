const Artifact = require('../models/artifacts');
// List of all artifacts
exports.artifact_list = async function (req, res) {
  try {
    theartifacts = await Artifact.find();
    res.send(theartifacts);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// VIEWS
// Handle a show all view
exports.artifact_view_all_Page = async function (req, res) {
  try {
    theartifacts = await Artifact.find();
    res.render('artifacts', { title: 'artifact Search Results', results: theartifacts });
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle artifact create on POST.
exports.artifact_create_post = async function (req, res) {
  console.log(req.body)
  let document = new Artifact();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"artifact_type":"goat", "cost":12, "size":"large"}
  document.artifact_type = req.body.artifact_type;
  document.origin = req.body.origin;
  document.age = req.body.age;
  try {
    let result = await document.save();
    res.send(result);
  }
  catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
// for a specific artifact.
exports.artifact_detail = async function (req, res) {
  console.log("detail" + req.params.id)
  try {
    result = await Artifact.findById(req.params.id)
    res.send(result)
  } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

//Handle artifact update form on PUT.
exports.artifact_update_put = async function (req, res) {
  console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
  try {
    let toUpdate = await Artifact.findById(req.params.id);
    if (!toUpdate) {
      return res.status(404).send({ error: `Artifact with id ${req.params.id} not found` });
    }
    // Update properties
    if (req.body.artifact_type) toUpdate.artifact_type = req.body.artifact_type;
    if (req.body.origin) toUpdate.origin = req.body.origin;
    if (req.body.age) toUpdate.age = req.body.age;

    let result = await toUpdate.save();
    console.log("Success " + result);
    res.status(200).json(result); // Send a JSON response on success
  } catch (err) {
    res.status(500).send({ error: `${err.message}: Update for id ${req.params.id} failed` });
  }
};


// Delete an artifact by ID
exports.artifact_delete = async function (req, res) {
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

// Handle a show one view with id specified by query
exports.artifact_view_one_Page = async function (req, res) {
  console.log("single view for id " + req.query.id)
  try {
    result = await Artifact.findById(req.query.id)
    res.render('artifactdetail',
      { title: 'Artifact Detail', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.artifact_create_Page = function (req, res) {
  console.log("create view")
  try {
    res.render('artifactcreate', { title: 'Artifact Create' });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a costume.
// query provides the id
exports.artifact_update_Page = async function(req, res) {
  console.log("Update view for Artifact with ID " + req.query.id);
  try {
      let result = await Artifact.findById(req.query.id);
      res.render('Artifactupdate', { title: 'Artifact Update', toShow: result });
  } catch (err) {
      if (err.name === 'ValidationError') {
          // If it's a validation error, render the page with the error message
          res.render('Artifactupdate', {
              title: 'Artifact Update',
              message: `Error: ${err.message}`,
              toShow: req.body // Preserve any previously entered data in the form
          });
      } else {
          // Handle other types of errors
          res.status(500).send(`{"error": "${err}"}`);
      }
  }
};

// Handle a delete one view with id from query
exports.artifact_delete_Page = async function (req, res) {
  console.log("Delete view for id " + req.query.id)
  try {
    result = await Artifact.findById(req.query.id)
    res.render('artifactdelete', { title: 'Artifact Delete', toShow: result });
  }
  catch (err) {
    res.status(500)
    res.send(`{'error': '${err}'}`);
  }
};

exports.artifact_update_post = async function(req, res) {
  try {
      // Try updating the Artifact
      const updatedSite = await artifact.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });

      if (!updatedSite) {
          return res.status(404).json({ error: 'Artifact not found' });
      }

      // Return a success message if the update is successful
      res.status(200).json({ message: 'Update succeeded', updatedSite });
  } catch (err) {
      // Check if the error is a validation error
      if (err.name === 'ValidationError') {
          // Send back the validation error details to the client
          return res.status(400).json({ error: `Validation failed: ${err.message}` });
      }

      // Handle other types of errors
      res.status(500).json({ error: `Internal server error: ${err.message}` });
  }
};
