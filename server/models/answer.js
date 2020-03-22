const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const AnswerSchema = new Schema({
  user_id: StrRequire,
  question_id: StrRequire,
  answer: StrRequire,
  created_at: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("ANSWER", AnswerSchema);
