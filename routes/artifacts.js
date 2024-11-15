// routes/artifacts.js
var express = require('express');
var router = express.Router();
const artifactsController = require('../controllers/artifactsController');

// Define the route for fetching all artifacts
router.get('/', artifactsController.artifact_list);

// Define the route for creating an artifact
router.post('/', artifactsController.artifact_create_post);

// Define the route for fetching a specific artifact by ID
router.get('/:id', artifactsController.artifact_detail);

// Define the route for updating an artifact by ID
router.put('/:id', artifactsController.artifact_update_put);

// Define the route for deleting an artifact by ID
router.delete('/:id', artifactsController.artifact_delete);

module.exports = router;
