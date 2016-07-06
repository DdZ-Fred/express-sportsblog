const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

router.get('/', (req, res) => {
  Article.findAll().then((articles) => {
    res.render('index', {
      title: 'Home',
      articles,
    });
  });
});

module.exports = router;
