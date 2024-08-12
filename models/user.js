const mongoose = require("mongoose");

// Created a New Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],

  friendRequests: [
    {
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Created The Model
const users = mongoose.model("users", UserSchema);

// Exported The Model
module.exports = users;
