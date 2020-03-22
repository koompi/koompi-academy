const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },
  user_id: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Category", CategorySchema);
