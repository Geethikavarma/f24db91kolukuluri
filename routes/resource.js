const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const artifactController = require('../controllers/artifactsController');

// Base API route
router.get('/', apiController.api);

// Artifact-specific routes
router.get('/artifacts', artifactController.artifact_list);
router.post('/artifacts', artifactController.artifact_create_post);
router.get('/artifacts/:id', artifactController.artifact_detail);
router.put('/artifacts/:id', artifactController.artifact_update_put);
router.delete('/artifacts/:id', artifactController.artifact_delete);

module.exports = router;
