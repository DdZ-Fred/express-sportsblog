const express = require('express');
const Article = require('../models/Article');
const addEditArticleSchema = require('../validation/add_edit_article.js');
const router = express.Router();

/*
  Show All Articles
 */
router.get('/', (req, res) => {
  Article.findAll().then((articles) => {
    res.render('articles', {
      title: 'All Articles',
      articles,
    });
  });
});


/*
  Show a single Article (by Id)
 */
router.get('/show/:id', ({ params }, res) => {
  Article.findById(params.id).then((article) => {
    res.render('article', {
      article,
    });
  });
});


/*
  Show Articles from particular category
 */
router.get('/category/:category_id', (req, res) => {
  res.render('articles');
});


router.post('/add', (req, res) => {
  // validation
  req.checkBody(addEditArticleSchema);
  const errors = req.validationErrors();
  // TODO: If Errors re-render page with messages...
});

module.exports = router;
