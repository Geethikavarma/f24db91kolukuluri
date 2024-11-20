const express = require('express');
const router = express.Router();
const artifactsController = require('../controllers/artifactsController');

// Existing routes
router.get('/', artifactsController.artifact_list);
router.post('/', artifactsController.artifact_create_post);
router.get('/:id', artifactsController.artifact_detail);
router.put('/:id', artifactsController.artifact_update_put);
router.delete('/:id', artifactsController.artifact_delete);

// Add route for the detail view page
router.get('/detail', artifactsController.artifact_view_one_Page);

module.exports = router;
