// routes/resource.js
var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var artifact_controller = require('../controllers/artifactsController');

// API Route for resources
router.get('/', api_controller.api);

// Artifact Routes
router.get('/artifacts', artifact_controller.artifact_list);  // List all artifacts

module.exports = router;
