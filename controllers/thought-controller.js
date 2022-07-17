const { Thoughts, Users, Reactions } = require("../models");
const { ObjectId } = require("mongoose").Types;
const reactionSchema = require("../models/Reactions");

module.exports = {
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thoughts.find({});
      console.log(thoughts);
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getOneThought: async (req, res) => {
    try {
      const results = await Thoughts.find({
        _id: ObjectId(req.params.id),
      });
      console.log(results);
      res.status(200).json(results);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  postThought: async (req, res) => {
    try {
      const newThought = await Thoughts.create({
        thoughtBody: req.body.thoughtBody,
        username: req.body.username,
      });
      const postThought = await Users.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      console.log(newThought);
      res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateThought: async (req, res) => {
    try {
      const updateThought = await Thoughts.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { thoughtBody: req.body.thoughtBody },
        { new: true }
      );
      console.log(updateThought);
      res.status(200).json(updateThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  deleteThought: async (req, res) => {
    try {
      const removeThought = await Thoughts.findOneAndDelete({
        _id: req.params.id,
      });
      console.log(removeThought);
      res.status(200).json(removeThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  postReaction: async (req, res) => {
    try {
      const newReaction = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtID },
        { $push: { reactions: req.body } },
        { new: true }
      );
      console.log(newReaction);
      res.status(200).json(newReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  deleteReaction: async (req, res) => {
    try {
      const removeReaction = await Thoughts.findOneAndDelete(
        { _id: req.params.thoughtID },
        { $pull: { reactions: { reactionID: req.params.reactionID } } },
        { new: true }
      );
      console.log(removeReaction);
      res.status(200).json(removeReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
