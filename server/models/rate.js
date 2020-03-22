const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const RateSchema = new Schema({
  course_id: StrRequire,
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  comment: StrRequire,
  user_id: StrRequire,
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("RATE", RateSchema);
