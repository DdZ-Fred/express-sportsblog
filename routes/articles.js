const express = require('express');
const csrf = require('csurf');
const Category = require('../models/Category');
const Article = require('../models/Article');
const addEditArticleSchema = require('../validation/add_edit_article.js');
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

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
router.get('/category/:categoryId', ({ params }, res) => {
  let categoryTitle;
  Category.findById(params.categoryId).then((cat) => {
    categoryTitle = cat.title;
    return Article.findAllByCategory(params.categoryId);
  }).then((articles) => {
    res.render('articles', {
      title: `${categoryTitle}`,
      articles,
    });
  });
});


router.post('/add', (req, res) => {
  // validation
  req.checkBody(addEditArticleSchema);
  const errors = req.validationErrors();
  if (errors) {
    Category.findAll().then((categories) => {
      res.render('add_article', {
        title: 'Add Article',
        categories,
        errors,
      });
    });
  } else {
    const { title, subtitle, category, author, body } = req.body;
    const newArticle = Article.create({
      title,
      subtitle,
      category,
      author,
      body,
    });
    newArticle.save().then((saved) => {
      req.flash('success', 'Article saved');
      res.redirect('/manage/articles');
    });
  }
});

router.post('/edit/:id', (req, res) => {
  req.checkBody(addEditArticleSchema);
  const errors = req.validationErrors();
  if (errors) {
    let article;
    Article.findById(req.params.id).then((art) => {
      article = art;
      return Category.findAll();
    }).then((categories) => {
      res.render('edit_article', {
        title: 'Edit Article',
        article,
        categories,
        errors,
      });
    });
  } else {
    const { title, subtitle, category, author, body } = req.body;
    const query = {
      _id: req.params.id,
    };
    const update = {
      title,
      subtitle,
      category,
      author,
      body,
    };
    Article.findOneAndUpdate(query, update).then((up) => {
      req.flash('success', 'Article updated');
      res.redirect('/manage/articles');
    });
  }
});

router.delete('/delete/:id', csrfProtection, ({ params }, res) => {
  const query = {
    _id: params.id,
  };
  Article.deleteOne(query).then((numDeleted) => {
    res.status(204).send();
  });
});

module.exports = router;
