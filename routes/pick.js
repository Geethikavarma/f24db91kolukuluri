const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Array of image file names
  const image_names = [ 'item1.jpg', 'item2.jpg', 'item3.jpg', 'item4.jpg', 'item5.jpg'];

  res.render('randomitem', { title: 'A random item', image_names: image_names });
});

module.exports = router;
