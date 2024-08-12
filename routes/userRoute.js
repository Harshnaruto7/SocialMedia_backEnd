const express = require("express");
const router = express.Router();
const {
  registerUsers,
  sendFriendRequest,
  acceptFriendRequest,
} = require("../controllers/userControllers");

router.post("/register", registerUsers);
router.post("/friend-request/:userId", sendFriendRequest);
router.put("/friend-request/:userId/:requestId", acceptFriendRequest);

module.export = router;
