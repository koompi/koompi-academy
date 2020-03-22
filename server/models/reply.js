const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const ReplySchema = new Schema({
  user_id: StrRequire,
  answer_id: StrRequire,
  reply: StrRequire,
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("REPLY", ReplySchema);
