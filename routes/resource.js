// routes/resource.js
const express = require('express');
const router = express.Router();
const api_controller = require('../controllers/api');
const artifact_controller = require('../controllers/artifactsController');

router.get('/', api_controller.api);
router.get('/artifacts', artifact_controller.artifact_list);
router.post('/artifacts', artifact_controller.artifact_create_post);
router.get('/artifacts/:id', artifact_controller.artifact_detail);
router.put('/artifacts/:id', artifact_controller.artifact_update_put);
router.delete('/artifacts/:id', artifact_controller.artifact_delete);

module.exports = router;
