const express = require('express');
const router = express.Router();
const artifactsController = require('../controllers/artifactsController');

// Route to view all heritage sites in a web page
router.get('/', artifactsController.artifacts_view_all_Page);

router.get('/create', (req, res) => res.render('artifacts_create_form'));
/* GET delete heritage site page */
router.get('/delete', artifactsController.artifacts_delete_Page);

// Export the router
module.exports = router;