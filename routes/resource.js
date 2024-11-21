const express = require('express');
const router = express.Router();

// Require controller modules
const api_controller = require('../controllers/api');
const heritageSiteController = require('../controllers/artifactsController');

// Base API route
router.get('/', api_controller.api);

// API routes for Heritage Site
router.post('/artifacts', heritageSiteController.heritageSite_create_post);
router.get('/artifacts', heritageSiteController.heritageSite_list);
router.get('/artifacts/all', heritageSiteController.heritageSite_view_all_Page);
/* GET create heritage site page */
router.get('/artifacts/create', heritageSiteController.heritageSite_create_Page);

// GET detail page for a specific Heritage Site (using query parameter)
router.get('/artifacts/detail', heritageSiteController.heritageSite_view_one_Page);
/* GET update page for heritage site */
router.get('/update', heritageSiteController.heritageSite_update_Page);
router.get('/artifacts/:id', heritageSiteController.heritageSite_detail);
router.put('/artifacts/:id', heritageSiteController.heritageSite_update_put);
router.delete('/artifacts/:id', heritageSiteController.heritageSite_delete);

module.exports = router;
