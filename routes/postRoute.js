const express = require("express");
const router = express.Router();
const {
  createPost,
  commentOnPost,
  getFeed,
  getExtendedFeed,
} = require("../controllers/postControllers");

router.post("/create", createPost);
router.post("/:postId/comment", commentOnPost);
router.get("/feed", getFeed);
router.get("/feed/extended", getExtendedFeed);

module.exports = router;
