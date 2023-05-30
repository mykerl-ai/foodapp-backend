const { model, Schema } = require("mongoose");

const opts = {
  timestamps: true,
};

const userSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    username: { type: String, default: null, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
  },
  opts
);

const User = model("User", userSchema);

const exportVariables = {
  User,
};

module.exports = exportVariables;
