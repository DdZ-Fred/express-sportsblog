import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('categories', {
    title: 'Categories',
  });
});

export default router;
