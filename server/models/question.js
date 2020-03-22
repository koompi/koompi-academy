const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const QuestionSchema = new Schema({
  course_id: {
    type: String,
    required: true
  },
  user_id: StrRequire,
  question: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("QUESTION", QuestionSchema);
