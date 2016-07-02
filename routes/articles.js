import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('articles', {
    title: 'All Articles',
  });
});

router.get('/show/:id', (req, res) => {
  // Get article from DB
  res.render('article');
});

router.get('/category/:category_id', (req, res) => {
  res.render('articles');
});

export default router;
