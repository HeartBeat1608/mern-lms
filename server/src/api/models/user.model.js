const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  rights: [
    {
      right: {
        type: Schema.Types.ObjectId,
        ref: "Navigation",
      },
      fullControl: {
        type: Schema.Types.Boolean,
        default: false,
      },
      canView: {
        type: Schema.Types.Boolean,
        default: false,
      },
      canEdit: {
        type: Schema.Types.Boolean,
        default: false,
      },
      canDelete: {
        type: Schema.Types.Boolean,
        default: false,
      },
    },
  ],
  issued: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = model("User", userSchema);
