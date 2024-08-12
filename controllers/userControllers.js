const User = require("../models/user");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sendFriendRequest = async (req, res) => {
  // Logic for sending a friend request to the Another Person(User)

  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    if (
      friend.friendRequests.includes(userId) ||
      friend.friends.includes(userId)
    ) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    friend.friendRequests.push(userId);
    await friend.save();

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  // Logic for accepting/rejecting a friend request for Social media app
  const { userId, friendId, action } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.friendRequests.includes(friendId)) {
      return res
        .status(400)
        .json({ error: "No friend request found from this user" });
    }

    if (action === "accept") {
      user.friends.push(friendId);
      friend.friends.push(userId);
      user.friendRequests = user.friendRequests.filter(
        (id) => id.toString() !== friendId.toString()
      );
      await user.save();
      await friend.save();

      return res.status(200).json({ message: "Friend request accepted" });
    } else if (action === "reject") {
      user.friendRequests = user.friendRequests.filter(
        (id) => id.toString() !== friendId.toString()
      );
      await user.save();

      return res.status(200).json({ message: "Friend request rejected" });
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.export = {
  registerUser,
  sendFriendRequest,
  acceptFriendRequest,
};
