const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StrRequire = {
  type: String,
  required: true
};

const FileSchema = new Schema({
  own_id: StrRequire,
  name: StrRequire,
  mime_type: StrRequire,
  created_at: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("FILE", FileSchema);
