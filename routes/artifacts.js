// routes/artifacts.js
const express = require('express');
const router = express.Router();
const artifactsController = require('../controllers/artifactsController');

router.get('/', artifactsController.artifact_list);
router.post('/', artifactsController.artifact_create_post);
router.get('/:id', artifactsController.artifact_detail);
router.put('/:id', artifactsController.artifact_update_put);
router.delete('/:id', artifactsController.artifact_delete);

module.exports = router;
