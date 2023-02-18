const { Schema, model } = require("mongoose");

const restroomSchema = new Schema(
  {
    id: {
      type: String
    },
    name: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    accessible: {
      type: Boolean,
    },
    unisex: {
      type: Boolean,
    },
    directions: {
      type: String,
    },
    comment: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    downvote: {
      type: Number,
    },
    upvote: {
      type: Number,
    },
    country: {
      type: String
    },
    changing_table: {
      type: Boolean
    },
    comments: [{
      ref: 'comment',
      type: Schema.Types.ObjectId
    }],
    votes: [{
      ref: 'vote',
      type: Schema.Types.ObjectId
    }]

  },
  {
    timestamps: true
  }
);

const Restroom = model("restroom", restroomSchema);

module.exports = Restroom;
