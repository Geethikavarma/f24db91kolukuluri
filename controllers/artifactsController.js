const Artifact = require('../models/artifacts');

// View all artifacts
exports.artifacts_list = async function (req, res) {
    try {
        const artifacts = await Artifact.find();
        res.send(artifacts);
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
};

// View all artifacts (page)
exports.artifacts_view_all_Page = async function (req, res) {
    try {
        const results = await Artifact.find();
        res.render('artifacts', { title: 'Artifacts', results: results });
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
};

// Create artifact (POST)
exports.artifacts_create_post = async function (req, res) {
    const document = new Artifact({
        artifact_type: req.body.artifact_type,
        origin: req.body.origin,
        age: req.body.age,
    });

    try {
        const result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
};

// Create artifact (page)
exports.artifacts_create_Page = function (req, res) {
    try {
        res.render('artifactscreate', { title: 'Create Artifact' });
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
};
