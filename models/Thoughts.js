const mongoose = require("mongoose");
// const moment = require("moment");

const reactionSchema = require("./Reactions");
// const User = require("./Users");
// const Schema = mongoose.Types;

const thoughtSchema = new mongoose.Schema(
  {
    thoughtBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 320,
    },
    username: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactionSchema],
  },
  {
    toJson: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = mongoose.model("Thoughts", thoughtSchema);

module.exports = Thoughts;
