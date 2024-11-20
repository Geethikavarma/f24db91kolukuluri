const express = require('express');
const router = express.Router();
const artifactsController = require('../controllers/artifactsController');

// Define route for fetching all artifacts
router.get('/', artifactsController.artifact_list);

// Define route for fetching a specific artifact by ID
router.get('/:id', artifactsController.artifact_detail);

// Define route for viewing details of an artifact
router.get('/detail', artifactsController.artifact_view_one_Page);

// Define the route for creating an artifact
router.post('/', artifactsController.artifact_create_post);

// Define the route for updating an artifact by ID
router.put('/:id', artifactsController.artifact_update_put);

// Define the route for deleting an artifact by ID
router.delete('/:id', artifactsController.artifact_delete);

module.exports = router;
