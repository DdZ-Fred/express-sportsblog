const express = require('express');
const Category = require('../models/Category');
const csrf = require('csurf');
const router = express.Router();
const csrfProtection = csrf({ cookie: true });
/* **********
 *  ARTICLES
 * ********** */

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


/* ************
 *  CATEGORIES
 * *********** */

router.get('/categories', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('manage_categories', {
      title: 'Manage Categories',
      categories,
    });
  });
});

router.get('/categories/add', (req, res) => {
  res.render('add_category', {
    title: 'Add Category',
  });
});

router.get('/categories/edit/:category_id', csrfProtection, (req, res) => {
  Category.findById(req.params.category_id).then((category) => {
    res.render('edit_category', {
      title: 'Edit Category',
      category,
      csrfToken: req.csrfToken(),
    });
  });
});

module.exports = router;
