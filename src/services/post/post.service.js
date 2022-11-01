const { generateHTTPError } = require('../../utils/error');

const getPosts = (Post) => async (options = {}) => {
  let {
    filter, limit, skip, sort,
  } = options;

  limit = Number(limit);
  skip = Number(skip);

  // set the default value
  if (!filter) filter = {}; // {tags: 'what', age: 17}
  if (!limit || limit < 0) limit = 12;
  if (!skip || skip < 0) skip = 0;
  if (!sort) sort = { _id: 'desc' };

  // const title =
  // arraying the tags
  if (filter.tags) filter.tags = { $in: filter.tags.split(',') };
  if (filter.title) filter.title = new RegExp(filter.title, 'i');

  // put the defined properties in arrFilter
  const arrFilter = [];
  Object.keys(filter).forEach((key) => filter[key] !== undefined
  && arrFilter.push({ [key]: filter[key] }));

  // define is the filter 'or' or 'and';
  let newFilter = { $or: arrFilter };
  if (arrFilter.length === 0) newFilter = {};
  console.log(newFilter);
  const posts = await Post
    .find(newFilter)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    // .select('-selectedFile') /** for test only. comment after testing finish */
    .populate('userId', 'firstName lastName');

  console.log({ posts });
  return posts;
};

const totalPosts = (Post) => async (options = {}) => Post.estimatedDocumentCount();

const getPostById = (Post) => async (id, options = {}) => {
  if (!id) generateHTTPError(400, 'Need id to find data');
  const post = await Post.findById(id);
  if (!post) generateHTTPError(404, 'The post not found');
  return post;
};

const createPost = (Post) => async (data, options = {}) => Post.create(data);

const editPost = (Post) => async (filter, data, options = {}) => {
  const updatedPost = await Post.findOneAndUpdate(filter, data, { new: true });
  return updatedPost;
};

const deletePost = (Post) => async (filter, options = {}) => {
  const deletedPost = await Post.findOneAndDelete(filter);
  if (!deletedPost) generateHTTPError(404, 'Post belongs to the user not found');
  return deletedPost;
};

const createUserPost = (Post) => async (data, userId, options = {}) => {
  if (!userId) return 'userId required';
  const postData = { ...data, userId };
  return createPost(Post)(postData);
};

const editUserPost = (Post) => async (id, data, userId, options = {}) => {
  if (!userId) return 'userId required';
  const filter = { _id: id, userId };

  const updatedPost = await editPost(Post)(filter, data);
  if (!updatedPost) generateHTTPError(404, 'Post belongs to the user not found');
  return updatedPost;
};

// like post
const likePost = (Post) => async (id, userId, options = {}) => {
  const post = await Post.findById(id);
  const { likes } = post;
  const isLiked = likes.includes(userId);

  // if appear, remove the user, if not, add the userId.
  let newLikes;
  if (isLiked) {
    newLikes = post.likes.filter((uid) => JSON.parse(JSON.stringify(uid)) !== userId);
  } else {
    newLikes = [...post.likes, userId];
  }

  // const query = { $push: { likes: userId } };
  const updatedPost = await editPost(Post)({ _id: id }, { likes: newLikes });

  if (!updatedPost) generateHTTPError(404, 'Post not found');
  return updatedPost;
};

const deleteUserPost = (Post) => async (id, userId, options = {}) => {
  if (!userId) return 'userId required';
  const filter = { _id: id, userId };

  const deletedPost = await deletePost(Post)(filter);
  if (!deletedPost) generateHTTPError(404, 'Post belongs to the user not found');
  return deletedPost;
};

module.exports = (Post) => ({
  getPosts: getPosts(Post),
  totalPosts: totalPosts(Post),
  getPostById: getPostById(Post),

  createPost: createPost(Post),
  editPost: editPost(Post),
  deletePost: deletePost(Post),

  createUserPost: createUserPost(Post),
  editUserPost: editUserPost(Post),
  likePost: likePost(Post),
  deleteUserPost: deleteUserPost(Post),

});
