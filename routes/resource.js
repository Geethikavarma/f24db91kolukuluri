// routes/resource.js
var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var artifact_controller = require('../controllers/artifactsController');

// API Route
router.get('/', api_controller.api);

// Gadget Routes
router.get('/artifacts', artifact_controller.artifact_list);  
router.post('/artifacts', artifact_controller.artifact_create_post); 
router.get('/artifacts/:id', artifact_controller.artifact_detail); 
router.put('/artifacts/:id', artifact_controller.artifact_update_put); 
router.delete('/artifacts/:id', artifact_controller.artifact_delete); 

module.exports = router;