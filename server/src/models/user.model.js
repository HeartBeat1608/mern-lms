const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullname: {
    type: Schema.Types.String,
    required: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  email: Schema.Types.String,
  address: Schema.Types.String,
  contact: Schema.Types.String,
  issued: [
    {
      book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
      issue_date: Schema.Types.Number,
      return_date: Schema.Types.Number,
      penalty: {
        type: Schema.Types.Number,
        default: 0,
      },
    },
  ],
  balance: {
    type: Schema.Types.Number,
    default: 0,
  },
});

module.exports = model("User", userSchema);
