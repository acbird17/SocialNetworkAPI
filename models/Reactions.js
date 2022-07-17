const mongoose = require("mongoose");

const Schema = mongoose.Types;
let ObjectId = Schema.ObjectId;

const reactionSchema = new mongoose.Schema({
  reactionID: {
    type: ObjectId,
    default: new ObjectId(),
  },
  reactionText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 320,
  },
  username: {
    type: String,
    required: true,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = reactionSchema;
