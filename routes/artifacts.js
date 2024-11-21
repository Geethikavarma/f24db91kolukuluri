const express = require('express');
const router = express.Router();
const artifactController = require('../controllers/artifactsController');

// Routes for artifact views
router.get('/', artifactController.artifact_view_all_Page);
router.get('/create', artifactController.artifact_create_Page);
router.get('/delete', artifactController.artifact_delete_Page);
router.get('/update', artifactController.artifact_update_Page);
router.get('/detail', artifactController.artifact_view_one_Page);

module.exports = router;
