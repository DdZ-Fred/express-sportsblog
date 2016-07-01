import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('manage', {
    title: 'Manage',
  });
});

export default router;
