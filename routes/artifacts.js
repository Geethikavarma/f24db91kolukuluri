// routes/artifacts.js
const express = require('express');
const router = express.Router();
const artifactsController = require('../controllers/artifactsController');

// GET request to retrieve all artifacts
router.get('/', artifactsController.artifact_list);

// POST request to create a new artifact
router.post('/', artifactsController.artifact_create_post);

// GET request to retrieve details of a specific artifact by ID
router.get('/:id', artifactsController.artifact_detail);

// PUT request to update a specific artifact by ID
router.put('/:id', artifactsController.artifact_update_put);

// DELETE request to delete a specific artifact by ID
router.delete('/:id', artifactsController.artifact_delete);

module.exports = router;
