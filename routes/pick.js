const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Array of image file names
  const image_names = [
    'item1.jpeg', 
    'item2.jpeg', 
    'item3.jpeg', 
    'item4.jpeg', 
    'item5.jpeg'
  ];

  res.render('randomitem', { title: 'A random item', image_names: image_names });
});

module.exports = router;
