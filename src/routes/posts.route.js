const router = require('express').Router();

const PostController = require('../controllers/post.controller');
const { authenticate } = require('../middlewares/authHandler');

router.route('/')
  .get(PostController.getPostsWithPaginate)
  .post(authenticate, PostController.createPost);

router.route('/search')
  .get(PostController.getPostsBySearch);
// test only
// router.route('/test')
//   .get(authenticate, (req, res) => { res.json({ message: 'success' }); });
// test end

router.route('/:id')
  .get(PostController.getPost)
  .patch(authenticate, authenticate, PostController.editPost)
  .delete(authenticate, authenticate, PostController.deletePost);

router.route('/:id/likePost')
  .patch(authenticate, PostController.likePost);

module.exports = router;
