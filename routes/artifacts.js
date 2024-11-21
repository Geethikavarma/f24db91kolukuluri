const express = require('express');
const router = express.Router();
const artifactsController = require('../controllers/artifactsController');

// List all artifacts (page)
router.get('/', artifactsController.artifacts_view_all_Page);

// Create artifact (page)
router.get('/create', artifactsController.artifacts_create_Page);

// Create artifact (POST)
router.post('/', artifactsController.artifacts_create_post);

module.exports = router;
