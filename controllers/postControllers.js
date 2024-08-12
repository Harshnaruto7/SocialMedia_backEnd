const Post = require("../models/post");
const User = require("..//models/user");

const createPost = async (req, res) => {
  const { userId, content } = req.body;

  try {
    const newPost = new Post({ userId, content });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const commentOnPost = async (req, res) => {
  // Logic for commenting on a post

  const { userId, content } = req.body;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = { userId, content };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeed = async (req, res) => {
  // Logic for retrieving posts from friends

  const { userId } = req.query;

  try {
    const user = await User.findById(userId).populate("friends");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendIds = user.friends.map((friend) => friend._id);
    const posts = await Post.find({ userId: { $in: friendIds } }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExtendedFeed = async (req, res) => {
  // Logic for retrieving posts from non-friends with friend's comments

  const { userId } = req.query;

  try {
    const user = await User.findById(userId).populate("friends");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendIds = user.friends.map((friend) => friend._id);

    // Get posts by friends
    const friendPosts = await Post.find({ userId: { $in: friendIds } });

    // Get posts commented on by friends
    const commentedPosts = await Post.find({
      "comments.userId": { $in: friendIds },
      userId: { $nin: friendIds }, // Exclude posts by friends
    });

    const posts = [...friendPosts, ...commentedPosts].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.export = {
  createPost,
  commentOnPost,
  getFeed,
  getExtendedFeed,
};
