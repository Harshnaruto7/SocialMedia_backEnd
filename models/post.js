const mongoose = require("mongoose");

// Creating a new CommentSchema for the comment in the post.
const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Making a new Post Schema for making the post and using the comment Schema here
const PostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  content: {
    type: String,
    required: true,
  },

  comment: [CommentSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a new Model Post
const Post = mongoose.model("Post", PostSchema);

// Exporting the Post module
module.export = Post;
