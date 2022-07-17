const { Users } = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await Users.find({});
      console.log(users);
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getOneUser: async (req, res) => {
    try {
      const result = await Users.find({ _id: req.params.id })
        .populate({ path: "thoughts" })
        .populate({ path: "friends" });
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  postUser: async (req, res) => {
    try {
      const newUsers = await Users.create({
        username: req.body.username,
        email: req.body.email,
      });
      newUsers.save();
      console.log(newUsers);
      res.status(200).json(newUsers);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const updateUser = await Users.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      console.log(`Updated: ${updateUser}`);
      res.status(200).json(updateUser);
    } catch (err) {
      console.log(err);
      res.status(500), json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const removeUser = await Users.findOneAndDelete({ _id: req.params.id });
      console.log(`${removeUser} has been deleted!`);
      res.status(200).json(removeUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  postFriend: async (req, res) => {
    try {
      const newFriend = await Users.findOneAndUpdate(
        { _id: req.params.userID },
        { $push: { friends: req.params.friendID } },
        { new: true, runValidators: true }
      );
      console.log(newFriend);
      res.status(200).json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  deleteFriend: async (req, res) => {
    try {
      const removeFriend = await Users.findOneAndUpdate(
        { _id: req.params.userID },
        { $pull: { friends: req.params.friendID } },
        { new: true }
      );
      console.log(removeFriend);
      res.status(200).json(removeFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
