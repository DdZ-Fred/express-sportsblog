import express from 'express';
const router = express.Router();

router.get('/articles', (req, res) => {
  res.render('manage_articles', {
    title: 'Manage Articles',
  });
});

router.get('/categories', (req, res) => {
  res.render('manage_categories', {
    title: 'Manage Categories',
  });
});

export default router;
