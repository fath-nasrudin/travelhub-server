const router = require('express').Router();

const postsRoutes = require('./posts.route');
const authRoutes = require('./auth.route');
// const userRoutes = require('./user.route');
// const meRoutes = require('./me.route');

router.get('/', (req, res) => {
  res.send({ msg: 'APi home. We are not yet have documentation. Please read our code on github to consume the APIs' });
});

// routes
router.use('/posts', postsRoutes);
// router.use('/users', userRoutes);
router.use('/auth', authRoutes);
// router.use('/me', meRoutes);

module.exports = router;
