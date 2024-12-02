// routes/artifacts.js
var express = require('express');
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
}
// const artifact_controlers= require('../controllers/artifacts');
const artifactsController = require('../controllers/artifacts');
router.get('/', artifactsController.artifact_view_all_Page);
// GET request for one artifact.
router.get('/artifacts/:id', artifactsController.artifact_detail);
// Import the artifact controller (make sure the file path is correct)
const artifact_controller = require('../controllers/artifacts');
/* GET detail costume page */
router.get('/detail', artifactsController.artifact_view_one_Page);
// DELETE request to delete an artifact by ID
router.delete('/artifacts/:id', artifact_controller.artifact_delete);
/* GET create costume page */
router.get('/create', secured, artifact_controller.artifact_create_Page);
/* GET update costume page */
router.get('/update', secured, artifact_controller.artifact_update_Page);
/* GET create update page */
//router.get('/update', artifact_controller.artifact_update_Page);
/* GET delete costume page */
router.get('/delete', secured, artifact_controller.artifact_delete_Page)
module.exports = router;
