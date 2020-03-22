const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function(email) {
  var isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isEmail.test(email);
};

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  isVerified: { type: Boolean, default: false },
  password: {
    type: String,
    required: true,
    minlength: 60
  },
  avatar: {
    type: String,
    default: "avatar.jpg"
  },
  bio: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  role: {
    type: String,
    require: true,
    default: "student"
  }
});

module.exports = mongoose.model("User", UserSchema);
