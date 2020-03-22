const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const TransactionSchema = new Schema({
  course_id: StrRequire,
  user_id: StrRequire,
  price: {
    type: Number,
    required: true
  },
  method: StrRequire,
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("TRANSACTION", TransactionSchema);
