const express = require('express');
const Category = require('../models/Category');
const csrf = require('csurf');
const addEditCategorySchema = require('../validation/add_edit_category');
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.get('/', (req, res) => {
  console.log('[/categories] was requested');
  Category.findAll().then((categories) => {
    console.log(`Categories found: ${categories.length}`);
    res.render('categories', {
      title: 'Categories',
      categories,
    });
  });
});

router.post('/add', (req, res) => {
  // Validation
  req.checkBody(addEditCategorySchema);
  const errors = req.validationErrors();
  if (errors) {
    res.render('add_category', {
      title: 'Add Category',
      errors,
    });
  } else {
    const { title, description } = req.body;
    const newCat = Category.create({
      title,
      description,
    });
    newCat.save().then((savedCat) => {
      req.flash('success', `Category ${savedCat.title} saved!`);
      res.redirect('/manage/categories');
    });
  }
});


router.post('/edit/:id', (req, res) => {
  req.checkBody(addEditCategorySchema);
  const errors = req.validationErrors();
  if (errors) {
    Category.findById(req.params.id).then((category) => {
      res.render('edit_category', {
        title: 'Edit Category',
        errors,
        category,
      });
    });
  } else {
    const query = {
      _id: req.params.id,
    };
    const update = {
      title: req.body.title,
      description: req.body.description,
    };
    Category.findOneAndUpdate(query, update).then((up) => {
      req.flash('success', 'Category updated!');
      res.redirect('/manage/categories');
    });
  }
});

router.delete('/delete/:id', csrfProtection, (req, res) => {
  const query = {
    _id: req.params.id,
  };
  Category.deleteOne(query).then((numDeleted) => {
    console.log(`Category deleted: ${numDeleted}`);
    res.status(204).send();
  });
});

module.exports = router;
