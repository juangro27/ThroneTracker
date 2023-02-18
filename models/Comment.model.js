const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true
    },
    owner_id: {
      ref: 'user',
      type: Schema.Types.ObjectId
    },
  },
  {
    timestamps: true
  }
);

const Comment = model("comment", userSchema);

module.exports = Comment;
