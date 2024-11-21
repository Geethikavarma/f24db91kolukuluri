const express = require('express');
const router = express.Router();
const artifactControllers = require('../controllers/artifactsController');

console.log(artifactsController)
// Define route for fetching all artifacts
router.get('/', artifactsController.artifact_list);

// Define route for fetching a specific artifact by ID (JSON response)
router.get('/:id', artifactsController.artifact_detail);

// Define route for viewing details of an artifact (renders Pug view)
router.get('/detail', artifactsController.artifact_detail); 

// Define the route for creating an artifact
router.post('/', artifactsController.artifact_create_post);

// Define the route for updating an artifact by ID
router.put('/:id', artifactsController.artifact_update_put);

// Route to render the page to create a new artifact
router.get('/create', artifactsController.artifact_create_Page);

// Route to handle form submission for creating a new artifact
router.post('/create', artifactsController.artifact_create_post);

// Define the route for deleting an artifact by ID
router.delete('/:id', artifactsController.artifact_delete);

module.exports = router;
