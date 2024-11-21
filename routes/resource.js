const express = require('express');
const router = express.Router();

const api_controller = require('../controllers/api');
const artifactController = require('../controllers/artifactsController');

// Base API route
router.get('/', api_controller.api);

// Artifact API routes
router.post('/artifacts', artifactController.artifact_create_post);
router.get('/artifacts', artifactController.artifact_list);
router.get('/artifacts/all', artifactController.artifact_view_all_Page);
router.get('/artifacts/create', artifactController.artifact_create_Page);
router.get('/artifacts/:id', artifactController.artifact_detail);
router.put('/artifacts/:id', artifactController.artifact_update_put);
router.delete('/artifacts/:id', artifactController.artifact_delete);

module.exports = router;
