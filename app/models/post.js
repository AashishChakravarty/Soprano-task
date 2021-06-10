const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Comments = Schema({
  userId: Schema.Types.ObjectId,
  comment: String,
  commented_at: Date,
});

const Likes = Schema({
  userId: Schema.Types.ObjectId,
  liked_at: Date
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  images: [String],
  likes: [Likes],
  comments: [Comments],
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('post', postSchema);
