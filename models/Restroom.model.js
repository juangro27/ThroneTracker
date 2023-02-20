const { Schema, model } = require("mongoose");

const restroomSchema = new Schema(
  {
    reference: {
      type: String
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String
      },
      indications: {
        type: String,
      },
    },
    features: {
      changing_table: {
        type: Boolean
      },
      accessible: {
        type: Boolean,
      },
      unisex: {
        type: Boolean,
      },
    },

    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    },
    votes: {
      type: Object,
      down: {
        type: Number,
      },
      up: {
        type: Number,
      },
      votes: [{
        ref: 'vote',
        type: Schema.Types.ObjectId
      }]
    },
    comments: [{
      ref: 'comment',
      type: Schema.Types.ObjectId
    }],
  },
  {
    timestamps: true
  }
);

const Restroom = model("restroom", restroomSchema);

module.exports = Restroom;
