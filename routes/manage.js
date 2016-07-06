const express = require('express');
const router = express.Router();

/*
  ARTICLES
 */

router.get('/articles', (req, res) => {
  res.render('manage_articles', {
    title: 'Manage Articles',
  });
});

router.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article',
  });
});

router.get('/articles/edit/:article_id', ({ params }, res) => {
  res.render('edit_article', {
    title: 'Edit Article',
  });
});


/*
  CATEGORIES
 */

router.get('/categories', (req, res) => {
  res.render('manage_categories', {
    title: 'Manage Categories',
  });
});

router.get('/categories/add', (req, res) => {
  res.render('add_category', {
    title: 'Add Category',
  });
});

router.get('/categories/edit/:category_id', ({ params }, res) => {
  res.render('edit_category', {
    title: 'Edit Category',
  });
});

module.exports = router;
