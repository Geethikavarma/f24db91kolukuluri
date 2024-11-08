const express = require('express');
const router = express.Router();

// Sample data for artifacts
const artifacts = [
  { artifact_name: 'Ancient Vase', artifact_age: 1200, origin_culture: 'Greek' },
  { artifact_name: 'Stone Tablet', artifact_age: 3500, origin_culture: 'Egyptian' },
  { artifact_name: 'Samurai Sword', artifact_age: 600, origin_culture: 'Japanese' }
];

router.get('/', (req, res) => {
  res.render('artifacts', { 
    title: 'Search Results - Artifacts', 
    results: artifacts 
  });
});

module.exports = router;
