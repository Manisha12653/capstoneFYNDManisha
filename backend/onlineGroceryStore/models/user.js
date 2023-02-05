const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash_password: { type: String, required: true },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};
module.exports = mongoose.model("User", userSchema);
