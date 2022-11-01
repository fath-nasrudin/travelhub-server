const postService = require('../services/post');

class PostController {
  static async getPosts(req, res, next) {
    const options = req.query;

    try {
      const posts = await postService.getPosts(options);
      res.json({ data: posts });
    } catch (error) {
      next(error);
    }
  }

  static async getPostsWithPaginate(req, res, next) {
    const options = req.query;
    let page = Number(req.query.page);
    if (!page || page < 0) page = 1;

    const limit = 2;
    const skip = (page - 1) * limit;

    try {
      const totalPosts = await postService.totalPosts();
      const posts = await postService.getPosts({ ...options, limit, skip });

      const numberOfPages = Math.ceil(totalPosts / limit);
      res.json({ data: posts, currentPage: page, numberOfPages });
    } catch (error) {
      next(error);
    }
  }

  static async getPostsBySearch(req, res, next) {
    console.log('hitted');
    try {
      const {
        tags, title, skip, sort,
      } = req.query;
      const { limit } = req.query;
      const filter = { title, tags };

      console.log({
        tags, title, skip, sort,
      });
      const posts = await postService.getPosts({
        skip, limit, sort, filter,
      });
      res.json({ data: posts });
    } catch (error) {
      next(error);
    }
  }

  static async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postService.getPostById(id);
      res.json({ data: post });
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req, res, next) {
    try {
      const userId = req.user._id;
      const postData = req.body;

      const newPost = await postService.createUserPost(postData, userId);

      res.status(201).json({ data: newPost });
    } catch (error) {
      next(error);
    }
  }

  static async editPost(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const userId = req.user._id;

      const updatedPost = await postService.editUserPost(id, body, userId);
      res.json({ data: updatedPost });
    } catch (error) {
      next(error);
    }
  }

  static async deletePost(req, res, next) {
    try {
      const userId = req.user._id;
      const { id } = req.params;
      const deletedPost = await postService.deleteUserPost(id, userId);
      res.json({ data: { _id: deletedPost._id } });
    } catch (error) {
      next(error);
    }
  }

  static async likePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const likedPost = await postService.likePost(id, userId);
      res.json({ data: likedPost });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
