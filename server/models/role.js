const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ObjectId } = Schema.Types;

const RoleSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Role", RoleSchema);
