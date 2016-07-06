const express = require('express');
const Category = require('../models/Category');
const Article = require('../models/Article');
const csrf = require('csurf');
const router = express.Router();
const csrfProtection = csrf({ cookie: true });
/* **********
 *  ARTICLES
 * ********** */

router.get('/articles', (req, res) => {
  Article.findAll().then((articles) => {
    res.render('manage_articles', {
      title: 'Manage Articles',
      articles,
    });
  });
});

router.get('/articles/add', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('add_article', {
      title: 'Add Article',
      categories,
    });
  });
});

router.get('/articles/edit/:id', ({ params }, res) => {
  Article.findById(params.id).then((article) => {
    res.render('edit_article', {
      title: 'Edit Article',
      article,
    });
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
