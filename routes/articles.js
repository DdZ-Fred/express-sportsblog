import express from 'express';
const router = express.Router();

/*
  Show All Articles
 */
router.get('/', (req, res) => {
  res.render('articles', {
    title: 'All Articles',
  });
});

/*
  Show a single Article (by Id)
 */
router.get('/show/:id', (req, res) => {
  // Get article from DB
  res.render('article');
});

/*
  Show Articles from particular category
 */
router.get('/category/:category_id', (req, res) => {
  res.render('articles');
});

export default router;
