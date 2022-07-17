const mongoose = require("mongoose");
const Thought = require("./Thoughts");
const Schema = mongoose.Types;

const UsersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    thoughts: [
      {
        type: Schema.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of friends
UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the Users model using the Users Schema
const Users = mongoose.model("Users", UsersSchema);

// Export Users module
module.exports = Users;
