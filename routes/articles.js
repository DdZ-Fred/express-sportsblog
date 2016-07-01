import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/show/:id', (req, res) => {
  // Get article from DB

  res.render('article');
});

export default router;
