const { mongoose } = require('../config/db');

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  tags: [String],
  selectedFile: String,
  // likeCount: {
  //   type: Number,
  //   default: 0,
  // },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

postSchema.virtual('likeCount')
  .get(function () {
    return this.likes.length;
  });

postSchema.set('toObject', { virtuals: true });
postSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Post', postSchema);
