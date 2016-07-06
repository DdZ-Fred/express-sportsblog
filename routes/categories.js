const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('[/categories] was requested');
  Category.find().then((categories) => {
    console.log(`Categories found: ${categories.length}`);
    res.render('categories', {
      title: 'Categories',
      categories,
    });
  });
});

module.exports = router;
